"use client";

import { useState } from "react";
import { Section, VariantRow } from "@/app/design/showcase/ShowcaseLayout";
import { Logo } from "@/components/brand/Logo";
import { Wordmark } from "@/components/brand/Wordmark";
import { Compass } from "@/components/decorative/Compass";
import { Contour } from "@/components/decorative/Contour";
import { MobileNav } from "@/components/layout/MobileNav";
import { RadiusControl } from "@/components/layout/RadiusControl";
import { TopBar } from "@/components/layout/TopBar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CapacityBar } from "@/components/ui/CapacityBar";
import { FilterChip } from "@/components/ui/FilterChip";
import { SnapSlider } from "@/components/ui/SnapSlider";
import { UrlDisplay } from "@/components/ui/UrlDisplay";

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
      <Section id="brand" title="Brand">
        <div className="flex flex-col gap-12">
          <VariantRow label="WORDMARK · FULL">
            <div className="w-full overflow-x-auto">
              <Wordmark size={0.8} />
            </div>
          </VariantRow>
          <VariantRow label="WORDMARK · SMALL">
            <Wordmark size={0.4} />
          </VariantRow>
          <VariantRow label="LOGO · SIZE SCALE">
            <Logo size={28} />
            <Logo size={48} />
            <Logo size={72} />
          </VariantRow>
        </div>
      </Section>

      <Section id="decorative" title="Decorative · Contour & Compass">
        <div className="flex flex-col gap-6">
          <VariantRow label="COMPASS ROSE · SIZE SCALE">
            <Compass size={40} />
            <Compass size={68} />
            <Compass size={100} />
          </VariantRow>
          <VariantRow label="COMPASS ROSE · RESPONSIVE (40 → 68px)">
            <Compass className="size-10 md:size-[68px]" />
          </VariantRow>
          <VariantRow label="DENSITY · light">
            <div className="w-full h-30 overflow-hidden border border-border">
              <Contour
                w={900}
                h={120}
                density="light"
                seed={1}
                className="w-full h-full"
              />
            </div>
          </VariantRow>
          <VariantRow label="DENSITY · medium">
            <div className="w-full h-30 overflow-hidden border border-border">
              <Contour
                w={900}
                h={120}
                density="medium"
                seed={1}
                className="w-full h-full"
              />
            </div>
          </VariantRow>
          <VariantRow label="DENSITY · dense">
            <div className="w-full h-30 overflow-hidden border border-border">
              <Contour
                w={900}
                h={120}
                density="dense"
                seed={7}
                opacity={0.3}
                className="w-full h-full"
              />
            </div>
          </VariantRow>
          <VariantRow label="FADE · fadeStart=0.5 (default · from middle)">
            <div className="w-full h-30 overflow-hidden border border-border">
              <Contour
                w={900}
                h={120}
                density="dense"
                seed={7}
                opacity={0.3}
                fade
                className="w-full h-full"
              />
            </div>
          </VariantRow>
          <VariantRow label="FADE · fadeStart=1 (whole diagonal)">
            <div className="w-full h-30 overflow-hidden border border-border">
              <Contour
                w={900}
                h={120}
                density="dense"
                seed={7}
                opacity={0.3}
                fade
                fadeStart={1}
                className="w-full h-full"
              />
            </div>
          </VariantRow>
          <VariantRow label="COLOR · yellow">
            <div className="w-full h-30 overflow-hidden border border-border">
              <Contour
                w={900}
                h={120}
                density="dense"
                color="yellow"
                seed={3}
                opacity={0.45}
                className="w-full h-full"
              />
            </div>
          </VariantRow>
          <VariantRow label="COLOR · orange">
            <div className="w-full h-30 overflow-hidden border border-border">
              <Contour
                w={900}
                h={120}
                density="dense"
                color="orange"
                seed={11}
                opacity={0.45}
                className="w-full h-full"
              />
            </div>
          </VariantRow>
          <VariantRow label="COLOR · red">
            <div className="w-full h-30 overflow-hidden border border-border">
              <Contour
                w={900}
                h={120}
                density="dense"
                color="red"
                seed={5}
                opacity={0.4}
                className="w-full h-full"
              />
            </div>
          </VariantRow>
        </div>
      </Section>

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
          <VariantRow label="LOADING">
            <Button variant="primary" loading>
              SAVING
            </Button>
            <Button variant="secondary" loading>
              FILTERING
            </Button>
            <Button variant="destructive" loading>
              DELETING
            </Button>
          </VariantRow>
          <VariantRow label="asChild · renders a real <a>">
            <Button asChild variant="primary">
              <a href="#buttons">LINK AS BUTTON →</a>
            </Button>
            <Button asChild variant="outline">
              <a
                href="https://www.w3.org/WAI/ARIA/apg/patterns/"
                target="_blank"
                rel="noreferrer"
              >
                EXTERNAL ↗
              </a>
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

      <Section id="url-display" title="URL Display">
        <div className="flex max-w-md flex-col gap-6">
          <VariantRow label="NESTED PATH">
            <UrlDisplay
              host="raceatlas.moritzwieland.de"
              path="/events/berlin-marathon-2024/results"
            />
          </VariantRow>
          <VariantRow label="SINGLE SEGMENT">
            <UrlDisplay
              host="raceatlas.moritzwieland.de"
              path="/totally-bogus"
            />
          </VariantRow>
          <VariantRow label="ROOT">
            <UrlDisplay host="localhost:3000" path="/" />
          </VariantRow>
        </div>
      </Section>

      <Section id="capacity" title="Capacity Bar">
        <div className="flex flex-col gap-6 max-w-md">
          <VariantRow label="0–50% · black (30%)">
            <div className="w-full">
              <CapacityBar taken={4500} cap={15000} />
            </div>
          </VariantRow>
          <VariantRow label="50–75% · gold (60%)">
            <div className="w-full">
              <CapacityBar taken={9000} cap={15000} />
            </div>
          </VariantRow>
          <VariantRow label="75–90% · orange (80%)">
            <div className="w-full">
              <CapacityBar taken={12000} cap={15000} />
            </div>
          </VariantRow>
          <VariantRow label="90%+ · red (95%)">
            <div className="w-full">
              <CapacityBar taken={14250} cap={15000} />
            </div>
          </VariantRow>
          <VariantRow label="FULL · taken ≥ cap, no waitlist">
            <div className="w-full">
              <CapacityBar taken={15000} cap={15000} />
            </div>
          </VariantRow>
          <VariantRow label="WAITLIST · full + waitlist">
            <div className="w-full">
              <CapacityBar taken={15000} cap={15000} waitlist />
            </div>
          </VariantRow>
        </div>
      </Section>

      <Section id="topbar" title="Top Bar">
        <div className="flex flex-col gap-4 border border-border overflow-x-auto">
          <TopBar active="TIMELINE" live city="BERLIN" />
          <TopBar active="CALENDAR" live city="NEU-ULM" />
          <TopBar active="MAP" live city="HAMBURG" />
          {/* location off / denied — struck-through pin */}
          <TopBar active="EVENTS" />
        </div>
      </Section>

      <Section id="mobile-nav" title="Mobile Nav">
        <div className="flex flex-col gap-4 max-w-xs">
          <VariantRow label="TIMELINE ACTIVE">
            <div className="w-full">
              <MobileNav active="TIMELINE" />
            </div>
          </VariantRow>
          <VariantRow label="MAP ACTIVE">
            <div className="w-full">
              <MobileNav active="MAP" />
            </div>
          </VariantRow>
          <VariantRow label="EVENTS ACTIVE">
            <div className="w-full">
              <MobileNav active="EVENTS" />
            </div>
          </VariantRow>
        </div>
      </Section>

      <Section id="slider" title="Snap Slider">
        <div className="flex flex-col gap-10 max-w-sm">
          <VariantRow label="GENERIC · even-spaced stops, custom label + format">
            <div className="w-full">
              <SnapSlider
                label="RESULTS / PAGE"
                stops={[
                  { value: 10 },
                  { value: 20 },
                  { value: 50 },
                  { value: 100 },
                ]}
                defaultValue={20}
              />
            </div>
          </VariantRow>
          <VariantRow label="PRESET · RadiusControl (non-linear spacing)">
            <div className="w-full">
              <RadiusControl defaultValue={250} />
            </div>
          </VariantRow>
          <VariantRow label="DISABLED">
            <div className="w-full">
              <RadiusControl defaultValue={500} disabled />
            </div>
          </VariantRow>
        </div>
      </Section>
    </div>
  );
}
