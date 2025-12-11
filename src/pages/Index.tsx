import { useState, useEffect } from "react";
import { useTokens } from "@/hooks/useTokens";
import { Sidebar } from "@/components/design-system/Sidebar";
import { ColorsSection } from "@/components/design-system/ColorsSection";
import { TypographyHeadingsSection } from "@/components/design-system/TypographyHeadingsSection";
import { TypographyParagraphSection } from "@/components/design-system/TypographyParagraphSection";
import { ButtonsSection } from "@/components/design-system/ButtonsSection";
import { ComingSoonSection } from "@/components/design-system/ComingSoonSection";
import { SaveConfigDialog } from "@/components/design-system/SaveConfigDialog";
import { LoadConfigDialog } from "@/components/design-system/LoadConfigDialog";
import { ContainerSection } from "@/components/design-system/ContainerSection";
import { TypefacesSection } from "@/components/design-system/TypefacesSection";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const {
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
  } = useTokens();

  const [activeSection, setActiveSection] = useState("colors");
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "colors",
        "typefaces",
        "typography-headings",
        "typography-paragraph-large",
        "typography-paragraph-small",
        "containers",
        "buttons-primary",
        "buttons-secondary",
        "coming-soon",
      ];

      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom > 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSave = async () => {
    try {
      await save();
      toast({
        title: "Changes saved",
        description: "Your token customizations have been saved.",
      });
    } catch {
      toast({
        title: "Saved locally",
        description: "Could not save to cloud. Saved locally instead.",
        variant: "destructive",
      });
    }
  };

  const handleSaveAs = async (name: string) => {
    try {
      await saveAs(name);
      toast({
        title: "Configuration saved",
        description: `"${name}" has been saved successfully.`,
      });
    } catch {
      toast({
        title: "Error saving",
        description: "Could not save configuration. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLoad = (config: typeof savedConfigs[0]) => {
    loadConfig(config);
    toast({
      title: "Configuration loaded",
      description: `"${config.name}" has been loaded.`,
    });
  };

  const handleDelete = async (configId: string) => {
    try {
      await deleteConfig(configId);
      toast({
        title: "Configuration deleted",
        description: "The configuration has been removed.",
      });
    } catch {
      toast({
        title: "Error deleting",
        description: "Could not delete configuration. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReset = async () => {
    await reset();
    toast({
      title: "Tokens reset",
      description: "All tokens have been restored to their canonical values.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading tokens...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        activeSection={activeSection}
        hasChanges={hasChanges}
        currentConfigName={currentConfigName}
        onSave={handleSave}
        onSaveAs={() => setSaveDialogOpen(true)}
        onLoad={() => setLoadDialogOpen(true)}
        onReset={handleReset}
      />

      <SaveConfigDialog
        open={saveDialogOpen}
        onOpenChange={setSaveDialogOpen}
        onSave={handleSaveAs}
      />

      <LoadConfigDialog
        open={loadDialogOpen}
        onOpenChange={setLoadDialogOpen}
        configs={savedConfigs}
        onLoad={handleLoad}
        onDelete={handleDelete}
      />

      <main className="lg:ml-72 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-12 lg:px-12 lg:py-16 space-y-20">
          {/* Hero */}
          <header className="pt-8 lg:pt-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Interactive Style Guide
            </div>
            <h1 className="text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-4">
              Musio Design System
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A living snapshot of the Musio brand tokens. Edit values in real-time,
              see live previews, and export your customizations.
            </p>
          </header>

          {/* Sections */}
          <ColorsSection
            colors={tokens.colors}
            onUpdateColor={updateColor}
            onAddColor={addColor}
            tokens={tokens}
          />

          <TypefacesSection />

          <TypographyHeadingsSection
            headings={tokens.typography.headings}
            onUpdateHeading={updateHeading}
          />

          <TypographyParagraphSection
            variant="large"
            paragraph={tokens.typography.paragraph.large}
            onUpdateParagraph={updateParagraph}
          />

          <TypographyParagraphSection
            variant="small"
            paragraph={tokens.typography.paragraph.small}
            onUpdateParagraph={updateParagraph}
          />

          <ButtonsSection
            type="primary"
            button={tokens.buttons.primary}
            onUpdateButton={(state, updates) => updateButton("primary", state, updates)}
          />

          <ButtonsSection
            type="secondary"
            button={tokens.buttons.secondary}
            onUpdateButton={(state, updates) => updateButton("secondary", state, updates)}
          />

          <ContainerSection />

          <ComingSoonSection />

          {/* Footer */}
          <footer className="pt-12 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              Musio Design System — Snapshot v1.0
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Index;
