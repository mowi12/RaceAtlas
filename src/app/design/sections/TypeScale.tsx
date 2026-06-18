import { Section } from "@/app/design/DesignShowcase";

const typeScale: {
  name: string;
  textClass: string;
  weightClass: string;
  fontClass: string;
}[] = [
  {
    name: "display",
    textClass: "text-display",
    weightClass: "font-bold",
    fontClass: "font-display",
  },
  {
    name: "h1",
    textClass: "text-h1",
    weightClass: "font-bold",
    fontClass: "font-display",
  },
  {
    name: "h2",
    textClass: "text-h2",
    weightClass: "font-semibold",
    fontClass: "font-display",
  },
  {
    name: "h3",
    textClass: "text-h3",
    weightClass: "font-semibold",
    fontClass: "font-display",
  },
  {
    name: "body",
    textClass: "text-body",
    weightClass: "font-normal",
    fontClass: "font-body",
  },
  {
    name: "body-sm",
    textClass: "text-body-sm",
    weightClass: "font-normal",
    fontClass: "font-body",
  },
  {
    name: "caption",
    textClass: "text-caption",
    weightClass: "font-normal",
    fontClass: "font-body",
  },
  {
    name: "mono",
    textClass: "text-mono",
    weightClass: "font-medium",
    fontClass: "font-mono",
  },
];

export function TypeScale() {
  return (
    <Section id="type-scale" title="Type scale">
      <div className="flex flex-col gap-6">
        {typeScale.map(({ name, textClass, weightClass, fontClass }) => (
          <div
            key={name}
            className="flex flex-col gap-1 border-b border-border pb-4"
          >
            <span className="font-mono text-xs text-muted-foreground">
              {name} — {textClass} {weightClass} {fontClass}
            </span>
            <p className={`${textClass} ${weightClass} ${fontClass}`}>
              RaceAtlas — The flattest, fastest course in the majors.
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
