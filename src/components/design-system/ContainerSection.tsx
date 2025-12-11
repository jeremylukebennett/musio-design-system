import { SectionHeader } from "./SectionHeader";
import { CodeBlock } from "./CodeBlock";

const radiusScale = {
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  full: "9999px",
};

const appliedRadiusToken = "radius-lg";

const containerStyle = {
  background: "hsl(250, 20%, 18%)",
  border: "1px solid hsl(250, 15%, 25%)",
  borderRadius: radiusScale.lg, // cards/panels → radius-lg
  padding: "16px",
  color: "#ffffff",
  transition: "all 0.3s ease",
};

const containerCSS = `:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
}

.container-shell {
  background: hsl(250, 20%, 18%);
  border: 1px solid hsl(250, 15%, 25%);
  border-radius: var(--radius-lg); /* cards/panels */
  padding: 1rem;
  color: #fff;
  transition: all 0.3s ease;
}`;

export function ContainerSection() {
  return (
    <section className="animate-fade-in">
      <SectionHeader
        id="containers"
        title="Containers"
        description="Generic card shell derived from the Musio pricing module, with tiered radius tokens."
      />

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2 py-1 rounded bg-primary/15 text-primary text-xs font-semibold">
              Container Shell
            </span>
            <span className="text-xs text-muted-foreground">
              Radius token: {appliedRadiusToken} (cards/panels)
            </span>
          </div>
          <div
            className="shadow-[0_12px_40px_-24px_rgba(0,0,0,0.45)]"
            style={containerStyle}
          >
            <div className="text-sm text-muted-foreground mb-2">
              Tiered scale: sm (inputs), md (compact modules), lg (cards), xl (hero/layout), full (pills).
            </div>
            <p className="text-base text-foreground leading-relaxed">
              This shell mirrors the pricing cards: a deep indigo canvas, subtle 1px outline, and a consistent large
              radius token that does not shrink on larger canvases. Apply hover states by lightening the border or lifting
              with shadow to create emphasis.
            </p>
          </div>
        </div>

        <div className="p-6 bg-musio-gray/30">
          <CodeBlock title="Container Radius Scale" language="css" code={containerCSS} />
        </div>
      </div>
    </section>
  );
}
