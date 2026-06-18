"use client";

import { useState } from "react";
import { Section, VariantRow } from "@/app/design/showcase/ShowcaseLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CapacityBar } from "@/components/ui/CapacityBar";
import { FilterChip } from "@/components/ui/FilterChip";
import { SnapSlider } from "@/components/ui/SnapSlider";

const CHIP_LABELS = ["NEAREST", "SOONEST", "ROAD", "TRAIL", "ULTRA"];

function FilterChipsDemo() {
  const [active, setActive] = useState<Set<string>>(new Set(["NEAREST"]));

  function toggle(label: string) {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  }

  return (
    <>
      {CHIP_LABELS.map((label) => (
        <FilterChip
          key={label}
          active={active.has(label)}
          onClick={() => toggle(label)}
        >
          {label}
        </FilterChip>
      ))}
    </>
  );
}

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

      <Section id="badges" title="Badges">
        <div className="flex flex-col gap-8">
          <VariantRow label="SURFACE">
            <Badge variant="surface" value="road" />
            <Badge variant="surface" value="trail" />
            <Badge variant="surface" value="mixed" />
          </VariantRow>
          <VariantRow label="STATUS">
            <Badge variant="status" value="open" />
            <Badge variant="status" value="waitlist" />
            <Badge variant="status" value="full" />
          </VariantRow>
          <VariantRow label="DISTANCE">
            <Badge variant="distance" value="400m" />
            <Badge variant="distance" value="1K" />
            <Badge variant="distance" value="5K" />
            <Badge variant="distance" value="10K" />
            <Badge variant="distance" value="Half" />
            <Badge variant="distance" value="Marathon" />
            <Badge variant="distance" value="Ultra · 50K" />
          </VariantRow>
        </div>
      </Section>

      <Section id="chips" title="Filter Chips">
        <VariantRow label="ACTIVE + INACTIVE">
          <FilterChipsDemo />
        </VariantRow>
      </Section>

      <Section id="capacity" title="Capacity Bar">
        <div className="flex flex-col gap-6 max-w-md">
          <VariantRow label="UNDER 75% (42%)">
            <div className="w-full">
              <CapacityBar taken={6300} cap={15000} />
            </div>
          </VariantRow>
          <VariantRow label="75-90% (86%)">
            <div className="w-full">
              <CapacityBar taken={12900} cap={15000} />
            </div>
          </VariantRow>
          <VariantRow label="90%+ (91%)">
            <div className="w-full">
              <CapacityBar taken={24570} cap={27000} />
            </div>
          </VariantRow>
          <VariantRow label="FULL · waitlist=false (100%)">
            <div className="w-full">
              <CapacityBar taken={50000} cap={50000} />
            </div>
          </VariantRow>
          <VariantRow label="FULL · waitlist=true (100%)">
            <div className="w-full">
              <CapacityBar taken={50000} cap={50000} waitlist />
            </div>
          </VariantRow>
          <VariantRow label="91% · waitlist=true (not shown — not actually full)">
            <div className="w-full">
              <CapacityBar taken={24570} cap={27000} waitlist />
            </div>
          </VariantRow>
        </div>
      </Section>
    </div>
  );
}
