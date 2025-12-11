import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { TokenInput } from "./TokenInput";

export function TypefacesSection() {
  const [typefaces, setTypefaces] = useState([
    {
      id: "primary-typeface",
      name: "Inter",
      descriptor: "Primary UI Typeface",
      weightLabel: "Semi-Bold",
      fontFamily: '"Inter", "system-ui", sans-serif',
      lineHeight: "1.2",
      description:
        "Used for UI copy, body text, and standard headings across the product.",
      sample: "Inter Semi-Bold — Primary UI copy and headings",
    },
    {
      id: "accent-typeface",
      name: "Metcon Scaled Regular",
      descriptor: "Branded Accent Typeface",
      weightLabel: "Regular",
      fontFamily: '"Metcon Scaled Regular", "Inter", "system-ui", sans-serif',
      lineHeight: "1px",
      description:
        "Used sparingly for branded moments: logo lockup, nav labels on marketing, and hero titles.",
      sample: "Metcon Scaled Regular — Branded accent moments",
    },
  ]);

  const updateTypeface = (
    id: string,
    updates: Partial<(typeof typefaces)[number]>
  ) => {
    setTypefaces((prev) =>
      prev.map((face) => (face.id === id ? { ...face, ...updates } : face))
    );
  };

  return (
    <section className="animate-fade-in" id="typefaces">
      <SectionHeader
        id="typefaces"
        title="Typefaces"
        description="Inter drives most UI copy; Metcon Scaled Regular is reserved for branded accents with a tighter line-height."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {typefaces.map((face) => (
          <div
            key={face.id}
            className="rounded-xl border border-border bg-card overflow-hidden"
          >
            {(() => {
              const trimmed = String(face.lineHeight).trim();
              const computedLineHeight =
                trimmed.startsWith("-") && !trimmed.startsWith("calc(")
                  ? `calc(1em ${
                      trimmed.endsWith("px") ? trimmed : `${trimmed}px`
                    })`
                  : face.lineHeight;
              const fontWeight = face.weightLabel === "Semi-Bold" ? 600 : 400;
              return (
                <>
                  <div className="p-6 border-b border-border">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm uppercase tracking-[0.08em] text-muted-foreground">
                          {face.descriptor}
                        </p>
                        <h3 className="text-xl font-semibold text-foreground">
                          {face.name}
                        </h3>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold">
                        {face.weightLabel}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {face.description}
                    </p>
                    <div
                      className="p-4 mt-4 rounded-lg bg-musio-gray/40 border border-border/70"
                      style={{
                        fontFamily: face.fontFamily,
                        fontWeight,
                        lineHeight: 1,
                      }}
                    >
                      <span
                        className="text-foreground whitespace-pre-wrap break-words"
                        style={{
                          fontSize: face.name.includes("Metcon") ? "1.25rem" : "1.125rem",
                        }}
                      >
                        {face.sample}
                      </span>
                      <div className="mt-2 text-xs text-muted-foreground">
                        font-family: {face.fontFamily}; line-height:{" "}
                        {computedLineHeight};
                      </div>
                    </div>
                    {face.name.includes("Metcon") && (
                      <div className="text-xs text-muted-foreground mt-3">
                        Note: If Metcon isn&apos;t loaded, the fallback will
                        display. For branded use, ensure the font is available
                        and keep line-height tightened (~-1px via calc).
                      </div>
                    )}
                  </div>

                  <div className="p-6 bg-musio-gray/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <TokenInput
                        label="Font Family"
                        value={face.fontFamily}
                        onChange={(v) =>
                          updateTypeface(face.id, { fontFamily: v as string })
                        }
                        type="text"
                      />
                      <TokenInput
                        label="Line Height"
                        value={face.lineHeight}
                        onChange={(v) =>
                          updateTypeface(face.id, { lineHeight: v as string })
                        }
                        allowUnitChange
                        unit=""
                        type="text"
                      />
                      <TokenInput
                        label="Weight Label"
                        value={face.weightLabel}
                        onChange={(v) =>
                          updateTypeface(face.id, { weightLabel: v as string })
                        }
                        type="text"
                      />
                      <TokenInput
                        label="Sample Text"
                        value={face.sample}
                        onChange={(v) =>
                          updateTypeface(face.id, { sample: v as string })
                        }
                        type="text"
                      />
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-3">
                      Tip: If you enter a negative line-height (e.g.{" "}
                      <code>-1</code>), it renders as{" "}
                      <code>calc(1em - 1px)</code> automatically.
                    </p>
                  </div>
                </>
              );
            })()}
          </div>
        ))}
      </div>
    </section>
  );
}
