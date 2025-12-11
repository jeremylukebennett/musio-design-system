export interface SavedConfig {
  id: string;
  name: string;
  tokens: DesignTokens;
  createdAt: number;
  updatedAt: number;
}

export interface TextShadow {
  x: number;
  y: number;
  blur: number;
  color: string;
}

export interface TypographyToken {
  fontFamily: string;
  fontWeight: number;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  textShadow: TextShadow;
}

export interface ButtonStateToken {
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  minWidth: number;
  minHeight: number;
  fontFamily: string;
  fontWeight: number;
  fontSize: string;
  background: string;
  textColor: string;
  borderWidth: number;
  borderColor: string;
  borderRadius: number;
  borderEnabled?: boolean;
}

export interface ButtonToken {
  default: ButtonStateToken;
  hover: ButtonStateToken;
}

export interface ColorToken {
  name: string;
  value: string;
}

export interface DesignTokens {
  colors: ColorToken[];
  typography: {
    headings: {
      h1: TypographyToken;
      h2: TypographyToken;
      h3: TypographyToken;
      h4: TypographyToken;
      h5: TypographyToken;
      h6: TypographyToken;
    };
    paragraph: {
      large: TypographyToken;
      small: TypographyToken;
    };
  };
  buttons: {
    primary: ButtonToken;
    secondary: ButtonToken;
  };
}

export const canonicalTokens: DesignTokens = {
  colors: [
    { name: "musio-red", value: "#fb2545" },
    { name: "musio-slate", value: "#1a1925" },
    { name: "musio-gray", value: "#262532" },
    { name: "musio-black", value: "#000000" },
    { name: "musio-white", value: "#eeeeee" },
    { name: "cinesamples-blue", value: "#1e94fc" },
    { name: "musio-accent-mint", value: "#26FBB8" },
  ],
  typography: {
    headings: {
      h1: {
        fontFamily: "Inter",
        fontWeight: 600,
        fontSize: 70,
        lineHeight: 1.0,
        letterSpacing: -1.75,
        textShadow: { x: 0, y: 1, blur: 1, color: "#000000" },
      },
      h2: {
        fontFamily: "Inter",
        fontWeight: 600,
        fontSize: 60,
        lineHeight: 1.0,
        letterSpacing: -1.75,
        textShadow: { x: 0, y: 1, blur: 1, color: "#000000" },
      },
      h3: {
        fontFamily: "Inter",
        fontWeight: 600,
        fontSize: 50,
        lineHeight: 1.0,
        letterSpacing: -1.75,
        textShadow: { x: 0, y: 1, blur: 1, color: "rgba(0, 0, 0, 0.985)" },
      },
      h4: {
        fontFamily: "Inter",
        fontWeight: 600,
        fontSize: 40,
        lineHeight: 1.2,
        letterSpacing: -0.5,
        textShadow: { x: 0, y: 1, blur: 1, color: "rgba(0, 0, 0, 0.96)" },
      },
      h5: {
        fontFamily: "Inter",
        fontWeight: 600,
        fontSize: 30,
        lineHeight: 1.2,
        letterSpacing: -0.5,
        textShadow: { x: 0, y: 1, blur: 1, color: "rgba(0, 0, 0, 0.97)" },
      },
      h6: {
        fontFamily: "Inter",
        fontWeight: 600,
        fontSize: 20,
        lineHeight: 1.4,
        letterSpacing: 0,
        textShadow: { x: 0, y: 1, blur: 0, color: "rgba(0, 0, 0, 0.92)" },
      },
    },
    paragraph: {
      large: {
        fontFamily: "Inter",
        fontWeight: 600,
        fontSize: 18,
        lineHeight: 1.25,
        letterSpacing: 0,
        textShadow: { x: 0, y: 1, blur: 0, color: "rgba(0, 0, 0, 0.92)" },
      },
      small: {
        fontFamily: "Inter",
        fontWeight: 500,
        fontSize: 14,
        lineHeight: 1.5,
        letterSpacing: 0,
        textShadow: { x: 0, y: 1, blur: 0, color: "rgba(0, 0, 0, 0.82)" },
      },
    },
  },
  buttons: {
    primary: {
      default: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        minWidth: 300,
        minHeight: 48,
        fontFamily: "Inter",
        fontWeight: 600,
        fontSize: "0.9vw",
        background: "#fb2545",
        textColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#ffffff",
        borderRadius: 100,
        borderEnabled: true,
      },
      hover: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 35,
        paddingRight: 35,
        minWidth: 280,
        minHeight: 45,
        fontFamily: "Inter",
        fontWeight: 600,
        fontSize: "0.8vw",
        background: "#ffffff",
        textColor: "#fb2545",
        borderWidth: 1,
        borderColor: "#fb2545",
        borderRadius: 100,
        borderEnabled: true,
      },
    },
    secondary: {
      default: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        minWidth: 300,
        minHeight: 48,
        fontFamily: "Inter",
        fontWeight: 600,
        fontSize: "0.9vw",
        background: "#ffffff",
        textColor: "#fb2545",
        borderWidth: 1,
        borderColor: "#fb2545",
        borderRadius: 100,
        borderEnabled: true,
      },
      hover: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 35,
        paddingRight: 35,
        minWidth: 280,
        minHeight: 45,
        fontFamily: "Inter",
        fontWeight: 600,
        fontSize: "0.8vw",
        background: "#fb2545",
        textColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#ffffff",
        borderRadius: 100,
        borderEnabled: true,
      },
    },
  },
};

const STORAGE_KEY = "musio-design-tokens";

export function loadTokens(): DesignTokens {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return deepMerge(canonicalTokens, parsed);
    }
  } catch (e) {
    console.warn("Failed to load tokens from localStorage:", e);
  }
  return JSON.parse(JSON.stringify(canonicalTokens));
}

export function saveTokens(tokens: DesignTokens): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
  } catch (e) {
    console.error("Failed to save tokens to localStorage:", e);
  }
}

export function resetTokens(): DesignTokens {
  localStorage.removeItem(STORAGE_KEY);
  return JSON.parse(JSON.stringify(canonicalTokens));
}

function deepMerge<T>(target: T, source: Partial<T>): T {
  const result = { ...target };
  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      result[key] = deepMerge(
        result[key],
        source[key] as Partial<T[Extract<keyof T, string>]>
      );
    } else if (source[key] !== undefined) {
      result[key] = source[key] as T[Extract<keyof T, string>];
    }
  }
  return result;
}

export function generateCSSVariables(tokens: DesignTokens): string {
  const lines: string[] = [":root {"];

  tokens.colors.forEach((color) => {
    lines.push(`  --color-${color.name}: ${color.value};`);
  });

  lines.push("}");
  return lines.join("\n");
}

export function generateTypographyCSS(
  token: TypographyToken,
  selector: string
): string {
  const shadow = token.textShadow;
  return `${selector} {
  font-family: "${token.fontFamily}", sans-serif;
  font-weight: ${token.fontWeight};
  font-size: ${token.fontSize}px;
  line-height: ${token.lineHeight};
  letter-spacing: ${token.letterSpacing}px;
  text-shadow: ${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.color};
}`;
}

export function generateButtonCSS(
  token: ButtonToken,
  className: string
): string {
  const d = token.default;
  const h = token.hover;

  return `.${className}-wrapper {
  height: ${d.minHeight}px;
  display: flex;
  align-items: center;
}

.${className} {
  padding: ${d.paddingTop}px ${d.paddingRight}px ${d.paddingBottom}px ${
    d.paddingLeft
  }px;
  min-width: ${d.minWidth}px;
  min-height: ${d.minHeight}px;
  font-family: "${d.fontFamily}", sans-serif;
  font-weight: ${d.fontWeight};
  font-size: ${d.fontSize};
  background: ${d.background};
  color: ${d.textColor};
  border: ${d.borderEnabled === false ? 0 : d.borderWidth}px solid ${
    d.borderColor
  };
  border-radius: ${d.borderRadius}px;
  cursor: pointer;
  transition: all 0.25s ease-out;
}

.${className}:hover {
  padding: ${h.paddingTop}px ${h.paddingRight}px ${h.paddingBottom}px ${
    h.paddingLeft
  }px;
  min-width: ${h.minWidth}px;
  background: ${h.background};
  color: ${h.textColor};
  border: ${h.borderEnabled === false ? 0 : h.borderWidth}px solid ${
    h.borderColor
  };
}`;
}
