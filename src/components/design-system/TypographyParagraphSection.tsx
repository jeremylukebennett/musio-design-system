import { useState, type CSSProperties } from "react";
import { TypographyToken, generateTypographyCSS } from "@/lib/tokens";
import { SectionHeader } from "./SectionHeader";
import { CodeBlock } from "./CodeBlock";
import { TokenInput } from "./TokenInput";
import { normalizeFontFamily } from "@/lib/fontUtils";

interface TypographyParagraphSectionProps {
  variant: "large" | "small";
  paragraph: TypographyToken;
  onUpdateParagraph: (variant: "large" | "small", updates: Partial<TypographyToken>) => void;
}

export function TypographyParagraphSection({
  variant,
  paragraph,
  onUpdateParagraph,
}: TypographyParagraphSectionProps) {
  const [textValue, setTextValue] = useState(
    "Musio is the ultimate music production platform, designed for creators who demand professional-grade tools with an intuitive interface. Experience seamless workflow integration and unleash your creative potential with our cutting-edge sound design capabilities."
  );
  const [draft, setDraft] = useState("");
  const [hovered, setHovered] = useState(false);

  const shadow = paragraph.textShadow;
  const isLarge = variant === "large";

  const previewStyle: CSSProperties = {
    fontFamily: `"${paragraph.fontFamily}", sans-serif`,
    fontWeight: paragraph.fontWeight,
    fontSize: `${paragraph.fontSize}px`,
    lineHeight: paragraph.lineHeight,
    letterSpacing: `${paragraph.letterSpacing}px`,
    textShadow: `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.color}`,
  };

  return (
    <section className="animate-fade-in">
      <SectionHeader
        id={`typography-paragraph-${variant}`}
        title={`Typography — Paragraph ${isLarge ? "Large" : "Small"}`}
        description={isLarge ? "Body text styles for content and descriptions" : "Supporting body text styles for captions and fine print"}
      />

      <div className="rounded-xl border border-border bg-card">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`px-2 py-1 rounded text-xs font-semibold ${
                isLarge ? "bg-musio-mint/20 text-musio-mint" : "bg-primary/15 text-primary"
              }`}
            >
              Paragraph {isLarge ? "Large" : "Small"}
            </span>
            <span className="text-xs text-muted-foreground">
              {paragraph.fontSize}px / {paragraph.fontWeight} weight
            </span>
          </div>
          <div
            className="relative max-w-3xl"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
              setHovered(false);
              setDraft("");
            }}
          >
            <p
              className={`text-foreground transition-opacity duration-150 transform-none ${
                hovered ? "opacity-0" : "opacity-100"
              }`}
              style={previewStyle}
            >
              {textValue}
            </p>
            <textarea
              value={draft}
              placeholder={textValue}
              onChange={(e) => {
                setDraft(e.target.value);
                setTextValue(e.target.value);
              }}
              onFocus={() => setHovered(true)}
              onBlur={() => {
                setHovered(false);
                setDraft("");
              }}
              rows={3}
              className={`absolute inset-0 w-full h-full bg-transparent border border-dashed border-border/60 rounded-lg px-3 py-2 text-foreground caret-primary cursor-pointer resize-none whitespace-pre-wrap break-words leading-[inherit] transition-opacity duration-150 transform-none ${
                hovered ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              style={previewStyle}
            />
          </div>
        </div>

        <div className="p-6 bg-musio-gray/30">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
            <TokenInput
              label="Font Family"
              value={paragraph.fontFamily}
              onChange={(v) => {
                const normalized = normalizeFontFamily(v as string);
                onUpdateParagraph(variant, { fontFamily: normalized });
              }}
              type="text"
            />
            <TokenInput
              label="Font Size"
              value={paragraph.fontSize}
              onChange={(v) => onUpdateParagraph(variant, { fontSize: v as number })}
              type="number"
              unit="px"
              min={10}
              max={32}
            />
            <TokenInput
              label="Font Weight"
              value={paragraph.fontWeight}
              onChange={(v) => onUpdateParagraph(variant, { fontWeight: v as number })}
              type="number"
              min={100}
              max={900}
              step={100}
            />
            <TokenInput
              label="Line Height"
              value={paragraph.lineHeight}
              onChange={(v) => onUpdateParagraph(variant, { lineHeight: v as number })}
              type="number"
              step={0.05}
              min={1}
              max={3}
            />
            <TokenInput
              label="Letter Spacing"
              value={paragraph.letterSpacing}
              onChange={(v) => onUpdateParagraph(variant, { letterSpacing: v as number })}
              type="number"
              unit="px"
              step={0.1}
              min={-2}
              max={5}
            />
            <TokenInput
              label="Shadow Blur"
              value={shadow.blur}
              onChange={(v) =>
                onUpdateParagraph(variant, {
                  textShadow: { ...shadow, blur: v as number },
                })
              }
              type="number"
              unit="px"
              min={0}
              max={10}
            />
            <TokenInput
              label="Shadow Y"
              value={shadow.y}
              onChange={(v) =>
                onUpdateParagraph(variant, {
                  textShadow: { ...shadow, y: v as number },
                })
              }
              type="number"
              unit="px"
              min={-5}
              max={5}
            />
          </div>

          <CodeBlock
            title={`Paragraph ${isLarge ? "Large" : "Small"} Styles`}
            language="css"
            code={generateTypographyCSS(paragraph, `.paragraph-${variant}`)}
          />
        </div>
      </div>
    </section>
  );
}
