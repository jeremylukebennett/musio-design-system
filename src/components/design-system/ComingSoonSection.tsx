import { Lock } from "lucide-react";

const comingSoonItems = [
  "Form Inputs",
  "Cards & Containers",
  "Navigation",
  "Icons",
  "Spacing Scale",
  "Shadows",
  "Animations",
  "Breakpoints",
];

export function ComingSoonSection() {
  return (
    <section className="animate-fade-in" id="coming-soon">
      <div className="scroll-mt-8 mb-8 pb-4">
        <h2 className="text-3xl font-semibold text-foreground tracking-tight mb-2">
          Coming Soon
        </h2>
        <p className="text-muted-foreground text-base">
          Additional tokens and components are being added to the design system
        </p>
        <div className="mt-4 h-px bg-gradient-to-r from-muted-foreground/30 via-muted-foreground/10 to-transparent" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {comingSoonItems.map((item) => (
          <div
            key={item}
            className="rounded-xl border border-border/50 bg-card/30 p-6 flex flex-col items-center justify-center gap-3 opacity-50"
          >
            <Lock className="w-6 h-6 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-medium">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
