"use client";

import { useState } from "react";
import { Section, VariantRow } from "@/app/design/showcase/ShowcaseLayout";
import { Logo } from "@/components/brand/Logo";
import { Wordmark } from "@/components/brand/Wordmark";
import { CalendarCell } from "@/components/data/CalendarCell";
import {
  ElevationProfile,
  ElevationSpark,
} from "@/components/data/ElevationProfile";
import { EventCard } from "@/components/data/EventCard";
import { EventRow } from "@/components/data/EventRow";
import { MapPin } from "@/components/data/MapPin";
import { TimelineRow } from "@/components/data/TimelineRow";
import { Compass } from "@/components/decorative/Compass";
import { Contour } from "@/components/decorative/Contour";
import { MobileNav } from "@/components/layout/MobileNav";
import { RadiusControl } from "@/components/layout/RadiusControl";
import { TopBar } from "@/components/layout/TopBar";
import { Badge } from "@/components/ui/Badge";
import { BreadcrumbBar } from "@/components/ui/BreadcrumbBar";
import { Button } from "@/components/ui/Button";
import { CapacityBar } from "@/components/ui/CapacityBar";
import { CountdownDisplay } from "@/components/ui/CountdownDisplay";
import { FilterChip } from "@/components/ui/FilterChip";
import { SnapSlider } from "@/components/ui/SnapSlider";
import { StatBlock } from "@/components/ui/StatBlock";
import { UrlDisplay } from "@/components/ui/UrlDisplay";
import { MOCK_EVENTS } from "@/data/mock-events";
import { toBadgeSurface, toCapacityState } from "@/lib/badge";
import { Surface } from "@/types";

// MOCK_EVENTS is a fixed-length literal; indices below always exist.
function eventAt(index: number) {
  const event = MOCK_EVENTS[index];
  if (!event) throw new Error(`no mock event at index ${index}`);
  return event;
}

const berlin = eventAt(0);
const hamburg = eventAt(1);
const trail = eventAt(2);
const ultra = eventAt(6);
const noCapacity = eventAt(8); // Rhein Run 21 — has no race.capacity, demos the dropped CapacityBar

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
            <Badge variant="surface" value={toBadgeSurface(Surface.ROAD)} />
            <Badge variant="surface" value={toBadgeSurface(Surface.TRAIL)} />
            <Badge variant="surface" value={toBadgeSurface(Surface.MIXED)} />
          </VariantRow>
          <VariantRow label="CAPACITY">
            <Badge
              variant="capacity"
              value={toCapacityState({ cap: 100, taken: 40, waitlist: false })}
            />
            <Badge
              variant="capacity"
              value={toCapacityState({ cap: 100, taken: 100, waitlist: true })}
            />
            <Badge
              variant="capacity"
              value={toCapacityState({ cap: 100, taken: 100, waitlist: false })}
            />
          </VariantRow>
          <VariantRow label="DISTANCE">
            <Badge variant="distance" value={400} />
            <Badge variant="distance" value={1000} />
            <Badge variant="distance" value={5000} />
            <Badge variant="distance" value={10000} />
            <Badge variant="distance" value={21097} />
            <Badge variant="distance" value={42195} />
            <Badge variant="distance" value={50000} />
          </VariantRow>
          <VariantRow label="DIFFICULTY">
            <Badge variant="difficulty" value="Easy" />
            <Badge variant="difficulty" value="Medium" />
            <Badge variant="difficulty" value="Hard" />
            <Badge variant="difficulty" value="Extreme" />
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

      <Section id="stats" title="Stat Blocks">
        <div className="flex flex-col gap-8">
          <VariantRow label="SIZE · sm">
            <StatBlock value="12" label="EVENTS" size="sm" />
            <StatBlock value="487" label="OPEN NOW" size="sm" />
            <StatBlock value="034D" label="NEXT" size="sm" />
          </VariantRow>
          <VariantRow label="SIZE · md">
            <StatBlock value="1,284" label="EVENTS" size="md" />
            <StatBlock value="487" label="OPEN NOW" size="md" />
            <StatBlock value="034D" label="NEXT" size="md" />
          </VariantRow>
          <VariantRow label="SIZE · lg">
            <StatBlock value="1,284" label="EVENTS INDEXED" size="lg" />
            <StatBlock value="04 TRAIL" label="IN RADIUS" size="lg" />
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

      <Section id="countdown" title="Countdown Display">
        <div className="flex flex-wrap gap-12 items-end">
          <div className="flex flex-col gap-1">
            <div className="font-mono text-[9px] tracking-[2px] text-muted-foreground">
              SIZE · sm
            </div>
            <CountdownDisplay days={14} size="sm" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-mono text-[9px] tracking-[2px] text-muted-foreground">
              SIZE · md
            </div>
            <CountdownDisplay days={136} size="md" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-mono text-[9px] tracking-[2px] text-muted-foreground">
              SIZE · lg
            </div>
            <CountdownDisplay days={200} size="lg" />
          </div>
        </div>
      </Section>

      <Section id="event-row" title="Event Row">
        <div className="max-w-2xl border-b border-border">
          <EventRow event={berlin} />
          <EventRow event={trail} />
          <EventRow event={ultra} />
          <EventRow event={hamburg} />
        </div>
      </Section>

      <Section id="event-card" title="Event Card">
        <div className="flex flex-col gap-8">
          <VariantRow label="FEATURED (waitlist)">
            <div className="w-full max-w-xl">
              <EventCard event={berlin} variant="featured" />
            </div>
          </VariantRow>
          <VariantRow label="COMPACT · trail">
            <div className="w-80">
              <EventCard event={trail} variant="compact" />
            </div>
          </VariantRow>
          <VariantRow label="COMPACT · no capacity data">
            <div className="w-80">
              <EventCard event={noCapacity} variant="compact" />
            </div>
          </VariantRow>
        </div>
      </Section>

      <Section id="calendar" title="Calendar Cell">
        <div className="grid grid-cols-7 gap-px bg-border border border-border w-full max-w-2xl">
          <CalendarCell day={1} inMonth={true} />
          <CalendarCell day={2} inMonth={true} event={berlin} />
          <CalendarCell day={3} inMonth={true} />
          <CalendarCell day={4} inMonth={true} event={trail} />
          <CalendarCell day={5} inMonth={true} />
          <CalendarCell day={6} inMonth={false} />
          <CalendarCell day={7} inMonth={false} />
        </div>
      </Section>

      <Section id="timeline" title="Timeline Row">
        <div className="relative w-full h-30 border border-border bg-card overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, var(--border) 0 1px, transparent 1px 26px), repeating-linear-gradient(90deg, color-mix(in srgb, var(--border) 55%, transparent) 0 1px, transparent 1px 8.33%)`,
              backgroundPosition: "0 4px, 0 0",
            }}
          />
          <TimelineRow event={berlin} offsetPct={65} top={10} />
          <TimelineRow event={trail} offsetPct={20} top={36} />
          <TimelineRow event={ultra} offsetPct={40} top={62} />
        </div>
      </Section>

      <Section id="elevation" title="Elevation Profile">
        <div className="flex flex-col gap-12">
          <VariantRow label="FULL PROFILE">
            <div className="w-full">
              <ElevationProfile />
            </div>
          </VariantRow>
          <VariantRow label="SPARKLINE (for event rows)">
            <ElevationSpark w={120} h={28} seed={1} />
            <ElevationSpark w={120} h={28} seed={5} />
            <ElevationSpark w={120} h={28} seed={9} />
            <ElevationSpark w={120} h={28} seed={13} />
          </VariantRow>
        </div>
      </Section>

      <Section id="map-pin" title="Map Pins">
        <VariantRow label="YOU · ROAD EVENT · TRAIL EVENT">
          <div className="relative flex items-start gap-20 py-4 pl-4">
            <MapPin type="you" label="You" />
            <MapPin type="road" event={berlin} />
            <MapPin type="trail" event={trail} />
          </div>
        </VariantRow>
      </Section>

      <Section id="breadcrumb" title="Breadcrumb Bar">
        <div className="flex flex-col gap-4">
          <VariantRow label="DEFAULT · last item highlighted">
            <BreadcrumbBar items={["ATLAS", "TRAIL", "ULTRA", "DE-KN-100"]} />
          </VariantRow>
          <VariantRow label="HIGHLIGHT · error">
            <BreadcrumbBar items={["ATLAS", "ERROR"]} highlight="error" />
          </VariantRow>
          <VariantRow label="HIGHLIGHT · warning">
            <BreadcrumbBar items={["ATLAS", "WARNING"]} highlight="warning" />
          </VariantRow>
          <VariantRow label="DYNAMIC · derived from pathname (no items)">
            <BreadcrumbBar />
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
