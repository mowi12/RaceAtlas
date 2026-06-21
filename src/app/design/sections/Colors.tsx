import { Section } from "@/app/design/showcase/ShowcaseLayout";

const rawSwatches = [
  { name: "paper", bg: "bg-paper" },
  { name: "paper-2", bg: "bg-paper-2" },
  { name: "paper-3", bg: "bg-paper-3" },
  { name: "ink", bg: "bg-ink" },
  { name: "ink-soft", bg: "bg-ink-soft" },
  { name: "dim", bg: "bg-dim" },
  { name: "rule", bg: "bg-rule" },
  { name: "lime", bg: "bg-lime" },
  { name: "lime-ink", bg: "bg-lime-ink" },
  { name: "gold", bg: "bg-gold" },
  { name: "warm", bg: "bg-warm" },
];

const semanticPairs: { name: string; bg: string; fg?: string }[] = [
  { name: "background", bg: "bg-background", fg: "text-foreground" },
  { name: "card", bg: "bg-card", fg: "text-card-foreground" },
  { name: "popover", bg: "bg-popover", fg: "text-popover-foreground" },
  { name: "primary", bg: "bg-primary", fg: "text-primary-foreground" },
  { name: "secondary", bg: "bg-secondary", fg: "text-secondary-foreground" },
  { name: "muted", bg: "bg-muted", fg: "text-muted-foreground" },
  { name: "accent", bg: "bg-accent", fg: "text-accent-foreground" },
  {
    name: "destructive",
    bg: "bg-destructive",
    fg: "text-destructive-foreground",
  },
  { name: "success", bg: "bg-success", fg: "text-success-foreground" },
  { name: "caution", bg: "bg-caution", fg: "text-caution-foreground" },
  { name: "warning", bg: "bg-warning", fg: "text-warning-foreground" },
  { name: "border", bg: "bg-border" },
  { name: "input", bg: "bg-input" },
  { name: "ring", bg: "bg-ring" },
];

function Swatch({ name, bg, fg }: { name: string; bg: string; fg?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`h-20 w-full border border-border ${bg} flex items-center justify-center text-xs`}
      >
        {fg && <span className={fg}>Aa</span>}
      </div>
      <span className="font-mono text-xs">{name}</span>
    </div>
  );
}

export function Colors() {
  return (
    <div>
      <Section id="colors" title="Raw palette">
        <div className="grid grid-cols-5 gap-4">
          {rawSwatches.map((swatch) => (
            <Swatch key={swatch.name} {...swatch} />
          ))}
        </div>
      </Section>

      <Section id="semantic-tokens" title="Semantic tokens">
        <div className="grid grid-cols-5 gap-4">
          {semanticPairs.map((pair) => (
            <Swatch key={pair.name} {...pair} />
          ))}
        </div>
      </Section>
    </div>
  );
}
