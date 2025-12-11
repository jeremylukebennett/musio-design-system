import { SectionHeader } from "./SectionHeader";
import { CodeBlock } from "./CodeBlock";

const radiusScale = {
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  full: "9999px",
};

const borderWidthScale = {
  none: "0px",
  thin: "1px",
  medium: "2px",
  thick: "4px",
};

const bordersCSS = `:root {
  /* Border Radius Tokens */
  --radius-sm: 4px;    /* inputs, small buttons */
  --radius-md: 8px;    /* compact modules */
  --radius-lg: 12px;   /* cards, panels */
  --radius-xl: 16px;   /* hero sections, layouts */
  --radius-full: 9999px; /* pills, badges, circular */

  /* Border Width Tokens */
  --border-none: 0px;
  --border-thin: 1px;    /* default borders, dividers */
  --border-medium: 2px;  /* emphasis, focus states */
  --border-thick: 4px;   /* strong emphasis */
}

/* Example Usage */
.card {
  border: var(--border-thin) solid hsl(250, 15%, 25%);
  border-radius: var(--radius-lg);
}

.button {
  border-radius: var(--radius-sm);
  border: var(--border-thin) solid currentColor;
}

.badge {
  border-radius: var(--radius-full);
}`;

export function BordersSection() {
  return (
    <section className="animate-fade-in">
      <SectionHeader
        id="borders"
        title="Borders"
        description="Border radius and width tokens for consistent component styling across the design system."
      />

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {/* Border Radius Examples */}
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Border Radius Scale</h3>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2 py-1 rounded bg-primary/15 text-primary text-xs font-semibold">
              Tiered Radius Tokens
            </span>
            <span className="text-xs text-muted-foreground">
              sm (inputs) → md (compact) → lg (cards) → xl (hero) → full (pills)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(radiusScale).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-mono text-primary">radius-{key}</span>
                  <span className="text-muted-foreground font-mono text-xs">{value}</span>
                </div>
                <div
                  className="h-20 bg-musio-purple/20 border-2 border-musio-purple/40"
                  style={{ borderRadius: value }}
                />
                <p className="text-xs text-muted-foreground">
                  {key === 'sm' && 'Inputs, small buttons'}
                  {key === 'md' && 'Compact modules'}
                  {key === 'lg' && 'Cards, panels'}
                  {key === 'xl' && 'Hero sections, layouts'}
                  {key === 'full' && 'Pills, badges, circular'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Border Width Examples */}
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Border Width Scale</h3>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2 py-1 rounded bg-primary/15 text-primary text-xs font-semibold">
              Border Weights
            </span>
            <span className="text-xs text-muted-foreground">
              Consistent stroke weights for outlines and dividers
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(borderWidthScale).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-mono text-primary">border-{key}</span>
                  <span className="text-muted-foreground font-mono text-xs">{value}</span>
                </div>
                <div
                  className="h-16 bg-musio-gray/30 rounded-lg flex items-center justify-center"
                  style={{
                    border: `${value} solid hsl(250, 60%, 60%)`,
                  }}
                >
                  <span className="text-xs text-muted-foreground">
                    {key === 'none' && 'No border'}
                    {key === 'thin' && 'Default borders, dividers'}
                    {key === 'medium' && 'Emphasis, focus states'}
                    {key === 'thick' && 'Strong emphasis'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Combined Examples */}
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Common Combinations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Card / Panel</p>
              <div
                className="h-24 bg-musio-gray/30 flex items-center justify-center"
                style={{
                  border: `${borderWidthScale.thin} solid hsl(250, 15%, 25%)`,
                  borderRadius: radiusScale.lg,
                }}
              >
                <span className="text-xs font-mono text-muted-foreground">
                  border-thin + radius-lg
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Input Field</p>
              <div
                className="h-24 bg-musio-gray/30 flex items-center justify-center"
                style={{
                  border: `${borderWidthScale.thin} solid hsl(250, 15%, 25%)`,
                  borderRadius: radiusScale.sm,
                }}
              >
                <span className="text-xs font-mono text-muted-foreground">
                  border-thin + radius-sm
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Badge / Pill</p>
              <div className="flex items-center justify-center h-24">
                <div
                  className="px-4 py-2 bg-musio-purple/20 flex items-center justify-center"
                  style={{
                    border: `${borderWidthScale.thin} solid hsl(250, 60%, 60%)`,
                    borderRadius: radiusScale.full,
                  }}
                >
                  <span className="text-xs font-mono text-foreground">
                    border-thin + radius-full
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Focus State</p>
              <div
                className="h-24 bg-musio-gray/30 flex items-center justify-center"
                style={{
                  border: `${borderWidthScale.medium} solid hsl(250, 60%, 60%)`,
                  borderRadius: radiusScale.md,
                  outline: `${borderWidthScale.medium} solid hsl(250, 60%, 60%, 0.3)`,
                  outlineOffset: '2px',
                }}
              >
                <span className="text-xs font-mono text-muted-foreground">
                  border-medium + radius-md
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Hero Section</p>
              <div
                className="h-24 bg-musio-gray/30 flex items-center justify-center"
                style={{
                  border: `${borderWidthScale.thin} solid hsl(250, 15%, 25%)`,
                  borderRadius: radiusScale.xl,
                }}
              >
                <span className="text-xs font-mono text-muted-foreground">
                  border-thin + radius-xl
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Accent Border</p>
              <div
                className="h-24 bg-musio-gray/30 flex items-center justify-center"
                style={{
                  border: `${borderWidthScale.thick} solid hsl(250, 60%, 60%)`,
                  borderRadius: radiusScale.lg,
                }}
              >
                <span className="text-xs font-mono text-muted-foreground">
                  border-thick + radius-lg
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-musio-gray/30">
          <CodeBlock title="Border Tokens" language="css" code={bordersCSS} />
        </div>
      </div>
    </section>
  );
}
