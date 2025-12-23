import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { ColorToken, generateCSSVariables, DesignTokens } from "@/lib/tokens";
import { SectionHeader } from "./SectionHeader";
import { CodeBlock } from "./CodeBlock";
import { AddColorDialog } from "./AddColorDialog";

interface ColorsSectionProps {
  colors: ColorToken[];
  onUpdateColor: (index: number, value: string) => void;
  onAddColor: (color: { name: string; value: string }) => void;
  onDeleteColor: (index: number) => void;
  onUpdateColorFull: (index: number, color: { name: string; value: string }) => void;
  tokens: DesignTokens;
}

export function ColorsSection({ colors, onUpdateColor, onAddColor, onDeleteColor, onUpdateColorFull, tokens }: ColorsSectionProps) {
  const [addColorOpen, setAddColorOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleEditColor = (index: number) => {
    setEditingIndex(index);
  };

  const handleSaveEdit = (color: { name: string; value: string }) => {
    if (editingIndex !== null) {
      onUpdateColorFull(editingIndex, color);
      setEditingIndex(null);
    }
  };

  const handleCloseEdit = (open: boolean) => {
    if (!open) {
      setEditingIndex(null);
    }
  };

  return (
    <section className="animate-fade-in">
      <SectionHeader
        id="colors"
        title="Colors"
        description="Brand color palette tokens for the Musio design system"
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {colors.map((color, index) => (
          <div
            key={color.name}
            className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 relative"
          >
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button
                onClick={() => handleEditColor(index)}
                className="p-1.5 rounded-md bg-musio-gray/80 hover:bg-musio-gray text-muted-foreground hover:text-foreground transition-colors"
                title="Edit color"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDeleteColor(index)}
                className="p-1.5 rounded-md bg-musio-gray/80 hover:bg-destructive/80 text-muted-foreground hover:text-destructive-foreground transition-colors"
                title="Delete color"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div
              className="w-full h-24 rounded-lg mb-4 border border-border/50 transition-transform group-hover:scale-[1.02]"
              style={{ backgroundColor: color.value }}
            />
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-foreground text-sm">{color.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color.value}
                  onChange={(e) => onUpdateColor(index, e.target.value)}
                  className="w-8 h-8 rounded border border-border cursor-pointer bg-transparent shrink-0"
                />
                <input
                  type="text"
                  value={color.value}
                  onChange={(e) => onUpdateColor(index, e.target.value)}
                  className="w-32 md:w-36 px-3 py-1.5 rounded bg-musio-gray/50 border border-border text-foreground font-mono text-xs"
                />
              </div>
            </div>
          </div>
        ))}
        
        {/* Add Color Card */}
        <button
          onClick={() => setAddColorOpen(true)}
          className="group rounded-xl border-2 border-dashed border-border/50 bg-card/30 p-4 transition-all hover:border-primary/50 hover:bg-card/50 flex flex-col items-center justify-center min-h-[180px] cursor-pointer"
        >
          <Plus className="w-8 h-8 text-muted-foreground/50 mb-2 group-hover:text-primary/70 transition-colors" />
          <span className="text-muted-foreground/50 text-sm font-medium group-hover:text-primary/70 transition-colors">
            Add Color
          </span>
        </button>
      </div>

      <CodeBlock
        title="CSS Variables"
        language="css"
        code={generateCSSVariables(tokens)}
      />
      
      <AddColorDialog
        open={addColorOpen}
        onOpenChange={setAddColorOpen}
        onSave={onAddColor}
      />

      <AddColorDialog
        open={editingIndex !== null}
        onOpenChange={handleCloseEdit}
        onSave={handleSaveEdit}
        editingColor={editingIndex !== null ? colors[editingIndex] : null}
      />
    </section>
  );
}
