import { useState } from "react";
import { Plus } from "lucide-react";
import { ButtonToken, generateButtonCSS } from "@/lib/tokens";
import { SectionHeader } from "./SectionHeader";
import { CodeBlock } from "./CodeBlock";
import { TokenInput } from "./TokenInput";
import { AddTokenDialog } from "./AddTokenDialog";

interface CustomToken {
  name: string;
  property: string;
  value: string;
}

interface ButtonsSectionProps {
  type: "primary" | "secondary";
  button: ButtonToken;
  onUpdateButton: (
    state: "default" | "hover",
    updates: Partial<ButtonToken["default"]>
  ) => void;
}

export function ButtonsSection({ type, button, onUpdateButton }: ButtonsSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [addTokenOpen, setAddTokenOpen] = useState(false);
  const [customTokens, setCustomTokens] = useState<CustomToken[]>([]);
  const isPrimary = type === "primary";
  
  const currentState = isHovered ? button.hover : button.default;
  const currentHeight = currentState.height ?? currentState.minHeight;
  const wrapperHeight = Math.max(
    button.default.height ?? button.default.minHeight,
    button.hover.height ?? button.hover.minHeight
  );

  const wrapperStyle: React.CSSProperties = {
    height: `${wrapperHeight}px`,
    display: "flex",
    alignItems: "center",
  };

  const buttonStyle: React.CSSProperties = {
    padding: `${currentState.paddingTop}px ${currentState.paddingRight}px ${currentState.paddingBottom}px ${currentState.paddingLeft}px`,
    minWidth: `${currentState.minWidth}px`,
    height: `${currentHeight}px`,
    minHeight: `${currentHeight}px`,
    fontFamily: `"${currentState.fontFamily}", sans-serif`,
    fontWeight: currentState.fontWeight,
    fontSize: currentState.fontSize,
    background: currentState.background,
    color: currentState.textColor,
    border: currentState.borderEnabled === false
      ? "0px solid transparent"
      : `${currentState.borderWidth}px solid ${currentState.borderColor}`,
    borderRadius: `${currentState.borderRadius}px`,
    cursor: "pointer",
    transition: "all 0.25s ease-out",
  };

  return (
    <section className="animate-fade-in">
      <SectionHeader
        id={`buttons-${type}`}
        title={`Buttons — ${isPrimary ? "Primary" : "Secondary"}`}
        description={`${isPrimary ? "Primary" : "Secondary"} button styles with default and hover states`}
      />

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {/* Preview */}
        <div className="p-8 border-b border-border flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <span
              className={`px-2 py-1 rounded text-xs font-semibold ${
                isHovered
                  ? "bg-musio-mint/20 text-musio-mint"
                  : "bg-primary/20 text-primary"
              }`}
            >
              {isHovered ? "Hover State" : "Default State"}
            </span>
          </div>
          
          <div style={wrapperStyle}>
            <button
              style={buttonStyle}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isPrimary ? "Primary Button" : "Secondary Button"}
            </button>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Hover over the button to see the state change
          </p>
        </div>

        {/* Controls */}
        <div className="p-6 bg-musio-gray/30">
          {/* Default State Controls */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Default State
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <label className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <input
                  type="checkbox"
                  checked={button.default.borderEnabled !== false}
                  onChange={(e) =>
                    onUpdateButton("default", {
                      borderEnabled: e.target.checked,
                      borderWidth: e.target.checked ? button.default.borderWidth : 0,
                    })
                  }
                  className="h-4 w-4 rounded border-border bg-background"
                />
                Border Enabled
              </label>
              <TokenInput
                label="Padding Top"
                value={button.default.paddingTop}
                onChange={(v) => onUpdateButton("default", { paddingTop: v as number })}
                type="number"
                unit="px"
                min={0}
                max={50}
              />
              <TokenInput
                label="Padding Bottom"
                value={button.default.paddingBottom}
                onChange={(v) => onUpdateButton("default", { paddingBottom: v as number })}
                type="number"
                unit="px"
                min={0}
                max={50}
              />
              <TokenInput
                label="Padding Left"
                value={button.default.paddingLeft}
                onChange={(v) => onUpdateButton("default", { paddingLeft: v as number })}
                type="number"
                unit="px"
                min={0}
                max={100}
              />
              <TokenInput
                label="Padding Right"
                value={button.default.paddingRight}
                onChange={(v) => onUpdateButton("default", { paddingRight: v as number })}
                type="number"
                unit="px"
                min={0}
                max={100}
              />
              <TokenInput
                label="Min Width"
                value={button.default.minWidth}
                onChange={(v) => onUpdateButton("default", { minWidth: v as number })}
                type="number"
                unit="px"
                min={50}
                max={400}
              />
              <TokenInput
                label="Height"
                value={button.default.height ?? button.default.minHeight}
                onChange={(v) =>
                  onUpdateButton("default", {
                    height: v as number,
                    minHeight: v as number,
                  })
                }
                type="number"
                unit="px"
                min={24}
                max={120}
              />
              <TokenInput
                label="Font Size"
                value={button.default.fontSize}
                onChange={(v) => onUpdateButton("default", { fontSize: v as string })}
                type="text"
                unit="px"
                allowUnitChange
              />
              <TokenInput
                label="Border Width"
                value={button.default.borderWidth}
                onChange={(v) => onUpdateButton("default", { borderWidth: v as number })}
                type="number"
                unit="px"
                min={0}
                max={10}
              />
              <TokenInput
                label="Border Radius"
                value={button.default.borderRadius}
                onChange={(v) => onUpdateButton("default", { borderRadius: v as number })}
                type="number"
                unit="px"
                min={0}
                max={200}
              />
              <TokenInput
                label="Background"
                value={button.default.background}
                onChange={(v) => onUpdateButton("default", { background: v as string })}
                type="color"
              />
              <TokenInput
                label="Text Color"
                value={button.default.textColor}
                onChange={(v) => onUpdateButton("default", { textColor: v as string })}
                type="color"
              />
              <TokenInput
                label="Border Color"
                value={button.default.borderColor}
                onChange={(v) => onUpdateButton("default", { borderColor: v as string })}
                type="color"
              />
              
              {/* Custom Tokens */}
              {customTokens.map((token, idx) => (
                <TokenInput
                  key={token.name}
                  label={token.name}
                  value={token.value}
                  onChange={(v) => {
                    const updated = [...customTokens];
                    updated[idx] = { ...token, value: v as string };
                    setCustomTokens(updated);
                  }}
                  type="text"
                  allowUnitChange
                />
              ))}
              
              {/* Add Value Button */}
              <button
                onClick={() => setAddTokenOpen(true)}
                className="flex flex-col items-center justify-center gap-1 p-3 rounded-lg border-2 border-dashed border-border/50 hover:border-primary/50 hover:bg-card/50 transition-all min-h-[72px]"
              >
                <Plus className="w-4 h-4 text-muted-foreground/50" />
                <span className="text-xs text-muted-foreground/50">Add Value</span>
              </button>
            </div>
          </div>
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-musio-mint" />
              Hover State
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <label className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <input
                  type="checkbox"
                  checked={button.hover.borderEnabled !== false}
                  onChange={(e) =>
                    onUpdateButton("hover", {
                      borderEnabled: e.target.checked,
                      borderWidth: e.target.checked ? button.hover.borderWidth : 0,
                    })
                  }
                  className="h-4 w-4 rounded border-border bg-background"
                />
                Border Enabled
              </label>
              <TokenInput
                label="Padding Top"
                value={button.hover.paddingTop}
                onChange={(v) => onUpdateButton("hover", { paddingTop: v as number })}
                type="number"
                unit="px"
                min={0}
                max={50}
              />
              <TokenInput
                label="Padding Bottom"
                value={button.hover.paddingBottom}
                onChange={(v) => onUpdateButton("hover", { paddingBottom: v as number })}
                type="number"
                unit="px"
                min={0}
                max={50}
              />
              <TokenInput
                label="Padding Left"
                value={button.hover.paddingLeft}
                onChange={(v) => onUpdateButton("hover", { paddingLeft: v as number })}
                type="number"
                unit="px"
                min={0}
                max={100}
              />
              <TokenInput
                label="Padding Right"
                value={button.hover.paddingRight}
                onChange={(v) => onUpdateButton("hover", { paddingRight: v as number })}
                type="number"
                unit="px"
                min={0}
                max={100}
              />
              <TokenInput
                label="Min Width"
                value={button.hover.minWidth}
                onChange={(v) => onUpdateButton("hover", { minWidth: v as number })}
                type="number"
                unit="px"
                min={50}
                max={400}
              />
              <TokenInput
                label="Height"
                value={button.hover.height ?? button.hover.minHeight}
                onChange={(v) =>
                  onUpdateButton("hover", {
                    height: v as number,
                    minHeight: v as number,
                  })
                }
                type="number"
                unit="px"
                min={24}
                max={120}
              />
              <TokenInput
                label="Font Size"
                value={button.hover.fontSize}
                onChange={(v) => onUpdateButton("hover", { fontSize: v as string })}
                type="text"
                unit="px"
                allowUnitChange
              />
              <TokenInput
                label="Border Width"
                value={button.hover.borderWidth}
                onChange={(v) => onUpdateButton("hover", { borderWidth: v as number })}
                type="number"
                unit="px"
                min={0}
                max={10}
              />
              <TokenInput
                label="Border Radius"
                value={button.hover.borderRadius}
                onChange={(v) => onUpdateButton("hover", { borderRadius: v as number })}
                type="number"
                unit="px"
                min={0}
                max={200}
              />
              <TokenInput
                label="Background"
                value={button.hover.background}
                onChange={(v) => onUpdateButton("hover", { background: v as string })}
                type="color"
              />
              <TokenInput
                label="Text Color"
                value={button.hover.textColor}
                onChange={(v) => onUpdateButton("hover", { textColor: v as string })}
                type="color"
              />
              <TokenInput
                label="Border Color"
                value={button.hover.borderColor}
                onChange={(v) => onUpdateButton("hover", { borderColor: v as string })}
                type="color"
              />
            </div>
          </div>

          <CodeBlock
            title={`${isPrimary ? "Primary" : "Secondary"} Button CSS`}
            language="css"
            code={generateButtonCSS(button, `btn-${type}`)}
          />
        </div>
      </div>
      
      <AddTokenDialog
        open={addTokenOpen}
        onOpenChange={setAddTokenOpen}
        onSave={(token) => {
          setCustomTokens((prev) => [...prev, token]);
        }}
      />
    </section>
  );
}
