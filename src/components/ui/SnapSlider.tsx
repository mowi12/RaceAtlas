"use client";

import type React from "react";
import { useId, useMemo, useRef, useState } from "react";
import { cn, focusRing } from "@/lib/utils";

export interface SnapStop {
  value: number;
  label?: string;
  /**
   * Handle position along the track, 0–100. All-or-nothing: set it on every
   * stop or none. When omitted on all stops, stops are distributed evenly.
   */
  position?: number;
}

interface SnapSliderProps {
  stops: SnapStop[];
  value?: number;
  defaultValue?: number;
  /** Fires continuously as the selection changes (e.g. mid-drag). */
  onChange?: (value: number) => void;
  /** Fires once on pointer release and on each keyboard change. */
  onCommit?: (value: number) => void;
  /** Eyebrow label. Hidden when omitted; also names the slider for a11y. */
  label?: string;
  /** Formats the readout and `aria-valuetext`. */
  formatValue?: (value: number) => string;
  /** Show the value readout in the header. */
  showValue?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

interface PreparedStop {
  value: number;
  label: string;
  pos: number;
}

function prepareStops(stops: SnapStop[]): PreparedStop[] {
  const allHavePosition = stops.every((s) => s.position !== undefined);
  const someHavePosition = stops.some((s) => s.position !== undefined);

  if (
    process.env.NODE_ENV !== "production" &&
    someHavePosition &&
    !allHavePosition
  ) {
    console.warn(
      "SnapSlider: `position` must be set on every stop or none. Falling back to even spacing.",
    );
  }

  const sorted = [...stops];

  if (allHavePosition) {
    sorted.sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    return sorted.map((s) => ({
      value: s.value,
      label: s.label ?? String(s.value),
      pos: s.position ?? 0,
    }));
  }

  sorted.sort((a, b) => a.value - b.value);
  const n = sorted.length;
  return sorted.map((s, i) => ({
    value: s.value,
    label: s.label ?? String(s.value),
    pos: n === 1 ? 0 : (i / (n - 1)) * 100,
  }));
}

function posForValue(prepared: PreparedStop[], val: number): number {
  const first = prepared[0];
  if (!first) return 0;
  if (val <= first.value) return first.pos;
  for (let i = 0; i < prepared.length - 1; i++) {
    const a = prepared[i];
    const b = prepared[i + 1];
    if (!a || !b) continue;
    if (val <= b.value) {
      const span = b.value - a.value;
      const t = span === 0 ? 0 : (val - a.value) / span;
      return a.pos + t * (b.pos - a.pos);
    }
  }
  const last = prepared[prepared.length - 1];
  return last ? last.pos : 100;
}

function nearestIndexBy(
  prepared: PreparedStop[],
  target: number,
  key: "value" | "pos",
): number {
  let best = 0;
  let bestDist = Number.POSITIVE_INFINITY;
  for (let i = 0; i < prepared.length; i++) {
    const s = prepared[i];
    if (!s) continue;
    const d = Math.abs(s[key] - target);
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  }
  return best;
}

export function SnapSlider({
  stops,
  value,
  defaultValue,
  onChange,
  onCommit,
  label,
  formatValue = (v) => String(v),
  showValue = true,
  disabled = false,
  ariaLabel,
  className,
}: SnapSliderProps) {
  const prepared = useMemo(() => prepareStops(stops), [stops]);
  const firstValue = prepared[0]?.value ?? 0;

  const [internal, setInternal] = useState(defaultValue ?? firstValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  // Tracks the latest value across a drag so onCommit can fire the final one
  // without waiting for a state flush.
  const latest = useRef(current);
  latest.current = current;

  const values = prepared.map((s) => s.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pct = posForValue(prepared, current);
  const index = nearestIndexBy(prepared, current, "value");
  const labelId = useId();

  function change(next: number) {
    if (next === current) return;
    latest.current = next;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }

  function selectFromClientX(clientX: number) {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = rect.width > 0 ? (clientX - rect.left) / rect.width : 0;
    const clamped = Math.max(0, Math.min(1, ratio));
    const i = nearestIndexBy(prepared, clamped * 100, "pos");
    const stop = prepared[i];
    if (stop) change(stop.value);
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (disabled) return;
    e.preventDefault();
    e.currentTarget.focus();
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    selectFromClientX(e.clientX);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (disabled || !dragging.current) return;
    selectFromClientX(e.clientX);
  }

  function endDrag(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    dragging.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    onCommit?.(latest.current);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (disabled) return;
    let next = index;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp":
        next = Math.min(prepared.length - 1, index + 1);
        break;
      case "ArrowLeft":
      case "ArrowDown":
        next = Math.max(0, index - 1);
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = prepared.length - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    const stop = prepared[next];
    if (stop) {
      change(stop.value);
      onCommit?.(stop.value);
    }
  }

  return (
    <div className={cn("flex select-none flex-col gap-3", className)}>
      {(label || showValue) && (
        <div className="flex justify-between font-mono text-[10px] tracking-[2px]">
          {label ? (
            <span id={labelId} className="text-muted-foreground">
              {label}
            </span>
          ) : (
            <span />
          )}
          {showValue && (
            <span className="font-display font-black text-[18px] leading-none text-foreground">
              {formatValue(current)}
            </span>
          )}
        </div>
      )}

      <div
        ref={trackRef}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-labelledby={label ? labelId : undefined}
        aria-label={label ? undefined : ariaLabel}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={current}
        aria-valuetext={formatValue(current)}
        aria-disabled={disabled || undefined}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative flex h-7 touch-none select-none items-center",
          disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
          focusRing,
        )}
      >
        {/* tick marks */}
        {prepared.map((stop) => (
          <div
            key={stop.value}
            className="pointer-events-none absolute flex flex-col items-center"
            style={{ left: `${stop.pos}%`, transform: "translateX(-50%)" }}
          >
            <div className="h-2.5 w-px bg-foreground" />
            <div className="mt-0.5 font-mono text-[9px] text-muted-foreground">
              {stop.label}
            </div>
          </div>
        ))}
        {/* track */}
        <div className="pointer-events-none absolute top-[4px] right-0 left-0 h-0.5 bg-border" />
        {/* fill */}
        <div
          className="pointer-events-none absolute top-[4px] left-0 h-0.5 bg-foreground"
          style={{ width: `${pct}%` }}
        />
        {/* handle */}
        <div
          className="pointer-events-none absolute h-3.5 w-3.5 border border-foreground bg-accent"
          style={{
            left: `${pct}%`,
            top: 0,
            transform: "translate(-50%, -3px)",
          }}
        />
      </div>
    </div>
  );
}
