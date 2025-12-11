import { useState, useCallback, useEffect } from "react";
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  DesignTokens,
  SavedConfig,
  canonicalTokens,
  TypographyToken,
  ButtonToken,
} from "@/lib/tokens";

const TOKENS_DOC_ID = "musio-design-tokens";
const CONFIGS_COLLECTION = "saved-configs";

export function useTokens() {
  const [tokens, setTokens] = useState<DesignTokens>(canonicalTokens);
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [savedConfigs, setSavedConfigs] = useState<SavedConfig[]>([]);
  const [currentConfigName, setCurrentConfigName] = useState<string | null>(null);

  // Load tokens and saved configs from Firestore on mount
  useEffect(() => {
    const loadFromFirestore = async () => {
      try {
        // Load current tokens
        const docRef = doc(db, "tokens", TOKENS_DOC_ID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const savedTokens = docSnap.data() as DesignTokens;
          setTokens((prev) => mergeTokens(prev, savedTokens));
        }

        // Load saved configs
        const configsSnapshot = await getDocs(collection(db, CONFIGS_COLLECTION));
        const configs: SavedConfig[] = [];
        configsSnapshot.forEach((doc) => {
          configs.push(doc.data() as SavedConfig);
        });
        // Sort by updatedAt descending
        configs.sort((a, b) => b.updatedAt - a.updatedAt);
        setSavedConfigs(configs);
      } catch (error) {
        console.error("Error loading from Firestore:", error);
        // Fall back to localStorage if Firestore fails
        const saved = localStorage.getItem("musio-tokens");
        if (saved) {
          try {
            const parsed = JSON.parse(saved) as DesignTokens;
            setTokens((prev) => mergeTokens(prev, parsed));
          } catch {
            // ignore parse errors
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadFromFirestore();
  }, []);

  const updateColor = useCallback((index: number, value: string) => {
    setTokens((prev) => {
      const newColors = [...prev.colors];
      newColors[index] = { ...newColors[index], value };
      return { ...prev, colors: newColors };
    });
    setHasChanges(true);
  }, []);

  const addColor = useCallback((color: { name: string; value: string }) => {
    setTokens((prev) => ({
      ...prev,
      colors: [...prev.colors, color],
    }));
    setHasChanges(true);
  }, []);

  const updateHeading = useCallback(
    (level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6", updates: Partial<TypographyToken>) => {
      setTokens((prev) => ({
        ...prev,
        typography: {
          ...prev.typography,
          headings: {
            ...prev.typography.headings,
            [level]: { ...prev.typography.headings[level], ...updates },
          },
        },
      }));
      setHasChanges(true);
    },
    []
  );

  const updateParagraph = useCallback(
    (variant: "large" | "small", updates: Partial<TypographyToken>) => {
      setTokens((prev) => ({
        ...prev,
        typography: {
          ...prev.typography,
          paragraph: {
            ...prev.typography.paragraph,
            [variant]: { ...prev.typography.paragraph[variant], ...updates },
          },
        },
      }));
      setHasChanges(true);
    },
    []
  );

  const updateButton = useCallback(
    (
      type: "primary" | "secondary",
      state: "default" | "hover",
      updates: Partial<ButtonToken["default"]>
    ) => {
      setTokens((prev) => ({
        ...prev,
        buttons: {
          ...prev.buttons,
          [type]: {
            ...prev.buttons[type],
            [state]: { ...prev.buttons[type][state], ...updates },
          },
        },
      }));
      setHasChanges(true);
    },
    []
  );

  const save = useCallback(async () => {
    try {
      const docRef = doc(db, "tokens", TOKENS_DOC_ID);
      await setDoc(docRef, tokens);
      localStorage.setItem("musio-tokens", JSON.stringify(tokens));

      // If a config is currently loaded, update it in the saved-configs collection
      if (currentConfigName) {
        const loadedConfig = savedConfigs.find(c => c.name === currentConfigName);
        if (loadedConfig) {
          const updatedConfig: SavedConfig = {
            ...loadedConfig,
            tokens,
            updatedAt: Date.now(),
          };
          const configDocRef = doc(db, CONFIGS_COLLECTION, loadedConfig.id);
          await setDoc(configDocRef, updatedConfig);
          // Update the local savedConfigs list
          setSavedConfigs((prev) =>
            prev.map(c => c.id === loadedConfig.id ? updatedConfig : c)
          );
        }
      }

      setHasChanges(false);
    } catch (error) {
      console.error("Error saving tokens to Firestore:", error);
      localStorage.setItem("musio-tokens", JSON.stringify(tokens));
      setHasChanges(false);
      throw error;
    }
  }, [tokens, currentConfigName, savedConfigs]);

  const saveAs = useCallback(async (name: string) => {
    const now = Date.now();
    const configId = `config-${now}`;
    const newConfig: SavedConfig = {
      id: configId,
      name,
      tokens,
      createdAt: now,
      updatedAt: now,
    };

    try {
      const docRef = doc(db, CONFIGS_COLLECTION, configId);
      await setDoc(docRef, newConfig);
      setSavedConfigs((prev) => [newConfig, ...prev]);
      setCurrentConfigName(name);
      setHasChanges(false);
    } catch (error) {
      console.error("Error saving config to Firestore:", error);
      throw error;
    }
  }, [tokens]);

  const loadConfig = useCallback(async (config: SavedConfig) => {
    try {
      // Update the main tokens document in Firestore so it persists across sessions
      const docRef = doc(db, "tokens", TOKENS_DOC_ID);
      await setDoc(docRef, config.tokens);
      localStorage.setItem("musio-tokens", JSON.stringify(config.tokens));

      // Update local state
      setTokens(config.tokens);
      setCurrentConfigName(config.name);
      setHasChanges(false);
    } catch (error) {
      console.error("Error loading config:", error);
      // Even if Firestore fails, update local state
      setTokens(config.tokens);
      setCurrentConfigName(config.name);
      setHasChanges(false);
      throw error;
    }
  }, []);

  const deleteConfig = useCallback(async (configId: string) => {
    try {
      await deleteDoc(doc(db, CONFIGS_COLLECTION, configId));
      setSavedConfigs((prev) => prev.filter((c) => c.id !== configId));
    } catch (error) {
      console.error("Error deleting config from Firestore:", error);
      throw error;
    }
  }, []);

  const reset = useCallback(async () => {
    try {
      const docRef = doc(db, "tokens", TOKENS_DOC_ID);
      await setDoc(docRef, canonicalTokens);
      localStorage.removeItem("musio-tokens");
      setTokens(canonicalTokens);
      setCurrentConfigName(null);
      setHasChanges(false);
    } catch (error) {
      console.error("Error resetting tokens in Firestore:", error);
      localStorage.removeItem("musio-tokens");
      setTokens(canonicalTokens);
      setCurrentConfigName(null);
      setHasChanges(false);
    }
  }, []);

  return {
    tokens,
    hasChanges,
    isLoading,
    savedConfigs,
    currentConfigName,
    updateColor,
    addColor,
    updateHeading,
    updateParagraph,
    updateButton,
    save,
    saveAs,
    loadConfig,
    deleteConfig,
    reset,
  };
}

function mergeTokens(base: DesignTokens, incoming: DesignTokens): DesignTokens {
  return {
    ...base,
    ...incoming,
    colors: incoming.colors ?? base.colors,
    typography: {
      ...base.typography,
      ...incoming.typography,
      headings: {
        ...base.typography.headings,
        ...(incoming.typography?.headings ?? {}),
      },
      paragraph: {
        ...base.typography.paragraph,
        ...(incoming.typography?.paragraph ?? {}),
      },
    },
    buttons: {
      ...base.buttons,
      ...incoming.buttons,
    },
  };
}
