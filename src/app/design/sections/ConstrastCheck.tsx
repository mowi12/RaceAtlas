import { Section } from "@/app/design/showcase/ShowcaseLayout";
import { computeContrastResults } from "@/lib/contrast";

export function ContrastCheck() {
  const results = computeContrastResults();

  return (
    <Section id="contrast" title="Contrast check">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {results.map((item) => (
          <div key={item.label} className="flex flex-col gap-2">
            <div
              className={`flex h-32 w-full items-center justify-center bg-${item.bg} ${
                item.border ? "border-4 border-border" : ""
              } ${item.ring ? "ring-4 ring-ring ring-offset-4 ring-offset-background" : ""}`}
            >
              {!item.border && !item.ring && (
                <span className={`text-${item.fg} text-body`}>
                  Sample text — RaceAtlas
                </span>
              )}
              {item.border && (
                <span className="text-foreground text-body-sm">
                  border on this box
                </span>
              )}
              {item.ring && (
                <span className="text-foreground text-body-sm">
                  ring around this box
                </span>
              )}
            </div>
            <span className="font-mono text-xs text-foreground">
              {item.label}
            </span>
            <span
              className={`font-mono text-xs ${
                item.pass || item.exempt
                  ? "text-foreground"
                  : "text-destructive"
              }`}
            >
              {item.pass ? "✅" : item.exempt ? "⚠️" : "❌"}{" "}
              {item.ratio.toFixed(2)}:1 (need {item.required}:1)
              {!item.pass && item.exempt ? " · exempt" : ""}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
