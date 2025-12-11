interface SectionHeaderProps {
  title: string;
  description?: string;
  id: string;
}

export function SectionHeader({ title, description, id }: SectionHeaderProps) {
  return (
    <div id={id} className="scroll-mt-8 mb-8 pb-4">
      <h2 className="text-3xl font-semibold text-foreground tracking-tight mb-2">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground text-base">{description}</p>
      )}
      <div className="mt-4 h-px bg-gradient-to-r from-primary/50 via-primary/20 to-transparent" />
    </div>
  );
}
