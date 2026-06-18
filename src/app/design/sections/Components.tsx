import { Section, VariantRow } from "@/app/design/DesignShowcase";
import { Button } from "@/components/ui/Button";

export function Components() {
  return (
    <div>
      <Section id="buttons" title="Buttons">
        <div className="flex flex-col gap-8">
          <VariantRow label="VARIANTS · size=md">
            <Button variant="primary">OPEN THE ATLAS →</Button>
            <Button variant="secondary">FILTER NEAR ME</Button>
            <Button variant="ghost">TRY AGAIN ↻</Button>
            <Button variant="outline">OUTLINE</Button>
            <Button variant="destructive">DELETE RACE</Button>
          </VariantRow>
          <VariantRow label="SIZES · variant=primary">
            <Button size="sm" variant="primary">
              SMALL
            </Button>
            <Button size="md" variant="primary">
              MEDIUM
            </Button>
            <Button size="lg" variant="primary">
              LARGE
            </Button>
          </VariantRow>
          <VariantRow label="ICON BUTTON">
            <Button variant="secondary" size="sm">
              ★
            </Button>
            <Button variant="secondary" size="md">
              ★
            </Button>
          </VariantRow>
          <VariantRow label="DISABLED">
            <Button variant="primary" disabled>
              UNAVAILABLE
            </Button>
            <Button variant="destructive" disabled>
              DELETE RACE
            </Button>
          </VariantRow>
        </div>
      </Section>
    </div>
  );
}
