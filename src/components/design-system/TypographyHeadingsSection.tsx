import { useState, type CSSProperties } from "react";
import { TypographyToken, generateTypographyCSS } from "@/lib/tokens";
import { SectionHeader } from "./SectionHeader";
import { CodeBlock } from "./CodeBlock";
import { TokenInput } from "./TokenInput";
import { normalizeFontFamily } from "@/lib/fontUtils";

interface HeadingLevel {
  key: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  label: string;
  sampleText: string;
}

const headingLevels: HeadingLevel[] = [
  { key: "h1", label: "H1", sampleText: "Musio Heading H1" },
  { key: "h2", label: "H2", sampleText: "Musio Heading H2" },
  { key: "h3", label: "H3", sampleText: "Musio Heading H3" },
  { key: "h4", label: "H4", sampleText: "Musio Heading H4" },
  { key: "h5", label: "H5", sampleText: "Musio Heading H5" },
  { key: "h6", label: "H6", sampleText: "Musio Heading H6" },
];

interface TypographyHeadingsSectionProps {
  headings: Record<string, TypographyToken>;
  onUpdateHeading: (
    level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
    updates: Partial<TypographyToken>
  ) => void;
}

export function TypographyHeadingsSection({
  headings,
  onUpdateHeading,
}: TypographyHeadingsSectionProps) {
  const [textValues, setTextValues] = useState<Record<HeadingLevel["key"], string>>(
    () =>
      headingLevels.reduce(
        (acc, { key, sampleText }) => ({ ...acc, [key]: sampleText }),
        {} as Record<HeadingLevel["key"], string>
      )
  );
  const [drafts, setDrafts] = useState<Record<HeadingLevel["key"], string>>(
    () =>
      headingLevels.reduce(
        (acc, { key }) => ({ ...acc, [key]: "" }),
        {} as Record<HeadingLevel["key"], string>
      )
  );
  const [hoveredKey, setHoveredKey] = useState<HeadingLevel["key"] | null>(null);

  const handleTextChange = (key: HeadingLevel["key"], value: string) => {
    setDrafts((prev) => ({ ...prev, [key]: value }));
    setTextValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleBlur = (key: HeadingLevel["key"]) => {
    setHoveredKey((prev) => (prev === key ? null : prev));
    setDrafts((prev) => ({ ...prev, [key]: "" }));
  };

  return (
    <section className="animate-fade-in">
      <SectionHeader
        id="typography-headings"
        title="Typography — Headings"
        description="Heading styles from H1 to H6 using Inter Semi Bold font family"
      />

      <div className="space-y-8">
        {headingLevels.map(({ key, label, sampleText }) => {
          const token = headings[key];
          const shadow = token.textShadow;
          
          const previewStyle: CSSProperties = {
            fontFamily: `"${token.fontFamily}", sans-serif`,
            fontWeight: token.fontWeight,
            fontSize: `${token.fontSize}px`,
            lineHeight: token.lineHeight,
            letterSpacing: `${token.letterSpacing}px`,
            textShadow: `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.color}`,
          };

          return (
            <div
              key={key}
              className="rounded-xl border border-border bg-card"
            >
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2 py-1 rounded bg-primary/20 text-primary text-xs font-semibold">
                    {label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {token.fontFamily} · {token.fontWeight === 600 ? 'Semi Bold' : token.fontWeight} · {token.fontSize}px
                  </span>
                </div>
                <div
                  className="relative"
                  onMouseEnter={() => setHoveredKey(key)}
                  onMouseLeave={() => handleBlur(key)}
                >
                  <div
                    className={`text-foreground whitespace-pre-wrap break-words transition-opacity duration-150 transform-none ${
                      hoveredKey === key ? "opacity-0" : "opacity-100"
                    }`}
                    style={previewStyle}
                  >
                    {textValues[key]}
                  </div>
                  <textarea
                    value={drafts[key]}
                    placeholder={textValues[key]}
                    onChange={(e) => handleTextChange(key, e.target.value)}
                    onMouseEnter={() => setHoveredKey(key)}
                    onMouseLeave={() => handleBlur(key)}
                    onFocus={() => setHoveredKey(key)}
                    onBlur={() => handleBlur(key)}
                    rows={1}
                    className={`absolute inset-0 w-full h-full min-h-[3em] bg-transparent border border-dashed border-border/60 rounded-lg px-3 py-2 text-foreground caret-primary cursor-pointer whitespace-pre-wrap break-words leading-[inherit] resize-none transition-opacity duration-150 transform-none ${
                      hoveredKey === key ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                    style={previewStyle}
                  />
                </div>
              </div>

              <div className="p-6 bg-musio-gray/30">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
                  <TokenInput
                    label="Font Family"
                    value={token.fontFamily}
                    onChange={(v) => {
                      const normalized = normalizeFontFamily(v as string);
                      onUpdateHeading(key, { fontFamily: normalized });
                    }}
                    type="text"
                  />
                  <TokenInput
                    label="Font Size"
                    value={token.fontSize}
                    onChange={(v) => onUpdateHeading(key, { fontSize: v as number })}
                    type="number"
                    unit="px"
                    min={12}
                    max={120}
                  />
                  <TokenInput
                    label="Font Weight"
                    value={token.fontWeight}
                    onChange={(v) => onUpdateHeading(key, { fontWeight: v as number })}
                    type="number"
                    min={100}
                    max={900}
                    step={100}
                  />
                  <TokenInput
                    label="Line Height"
                    value={token.lineHeight}
                    onChange={(v) => onUpdateHeading(key, { lineHeight: v as number })}
                    type="number"
                    step={0.1}
                    min={0.5}
                    max={3}
                  />
                  <TokenInput
                    label="Letter Spacing"
                    value={token.letterSpacing}
                    onChange={(v) => onUpdateHeading(key, { letterSpacing: v as number })}
                    type="number"
                    unit="px"
                    step={0.25}
                    min={-5}
                    max={10}
                  />
                  <TokenInput
                    label="Shadow Blur"
                    value={shadow.blur}
                    onChange={(v) =>
                      onUpdateHeading(key, {
                        textShadow: { ...shadow, blur: v as number },
                      })
                    }
                    type="number"
                    unit="px"
                    min={0}
                    max={20}
                  />
                  <TokenInput
                    label="Shadow Y"
                    value={shadow.y}
                    onChange={(v) =>
                      onUpdateHeading(key, {
                        textShadow: { ...shadow, y: v as number },
                      })
                    }
                    type="number"
                    unit="px"
                    min={-10}
                    max={10}
                  />
                </div>

                <CodeBlock
                  title={`${label} Styles`}
                  language="css"
                  code={generateTypographyCSS(token, `.heading-${key}`)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
