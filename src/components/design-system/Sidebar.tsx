import { useState } from "react";
import {
  Palette,
  Type,
  AlignLeft,
  Square,
  Italic,
  MousePointerClick,
  Lock,
  Save,
  RotateCcw,
  Menu,
  X,
  FolderOpen,
  SaveAll,
  RectangleHorizontal,
  Image,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  disabled?: boolean;
}

const navItems: NavItem[] = [
  { id: "colors", label: "Colors", icon: <Palette className="w-4 h-4" /> },
  { id: "typefaces", label: "Typefaces", icon: <Italic className="w-4 h-4" /> },
  { id: "typography-headings", label: "Typography — Headings", icon: <Type className="w-4 h-4" /> },
  { id: "typography-paragraph-large", label: "Typography — Paragraph Large", icon: <AlignLeft className="w-4 h-4" /> },
  { id: "typography-paragraph-small", label: "Typography — Paragraph Small", icon: <AlignLeft className="w-4 h-4" /> },
  { id: "logos", label: "Logos", icon: <Image className="w-4 h-4" /> },
  { id: "containers", label: "Containers", icon: <Square className="w-4 h-4" /> },
  { id: "borders", label: "Borders", icon: <RectangleHorizontal className="w-4 h-4" /> },
  { id: "buttons-primary", label: "Buttons — Primary", icon: <MousePointerClick className="w-4 h-4" /> },
  { id: "buttons-secondary", label: "Buttons — Secondary", icon: <MousePointerClick className="w-4 h-4" /> },
  { id: "coming-soon", label: "Coming Soon", icon: <Lock className="w-4 h-4" />, disabled: true },
];

interface SidebarProps {
  activeSection: string;
  hasChanges: boolean;
  currentConfigName: string | null;
  onSave: () => void;
  onSaveAs: () => void;
  onLoad: () => void;
  onReset: () => void;
}

export function Sidebar({ 
  activeSection, 
  hasChanges, 
  currentConfigName,
  onSave, 
  onSaveAs,
  onLoad,
  onReset 
}: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border"
        aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMobileOpen}
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Backdrop */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-musio-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        role="navigation"
        aria-label="Design system navigation"
        className={cn(
          "fixed left-0 top-0 h-screen w-72 bg-sidebar border-r border-sidebar-border flex flex-col z-40 transition-transform lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="font-semibold text-sidebar-foreground text-sm leading-tight">
                Musio Design System
              </h1>
              <p className="text-xs text-muted-foreground">
                {currentConfigName || "Snapshot"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              disabled={item.disabled}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left",
                activeSection === item.id
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                item.disabled && "opacity-40 cursor-not-allowed"
              )}
            >
              {item.icon}
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="p-4 border-t border-sidebar-border space-y-2">
          <button
            onClick={onSave}
            disabled={!hasChanges}
            className={cn(
              "w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all",
              hasChanges
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-sidebar-accent text-muted-foreground cursor-not-allowed"
            )}
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
          <div className="flex gap-2">
            <button
              onClick={onSaveAs}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors border border-sidebar-border"
            >
              <SaveAll className="w-4 h-4" />
              Save As
            </button>
            <button
              onClick={onLoad}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors border border-sidebar-border"
            >
              <FolderOpen className="w-4 h-4" />
              Load
            </button>
          </div>
          <button
            onClick={onReset}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Canonical
          </button>
        </div>

        {/* Status */}
        {hasChanges && (
          <div className="px-4 pb-4">
            <div className="flex items-center gap-2 text-xs text-musio-mint">
              <span className="w-2 h-2 rounded-full bg-musio-mint animate-pulse" />
              Unsaved changes
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
