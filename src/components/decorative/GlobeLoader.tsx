"use client";

import { geoGraticule10, geoOrthographic, geoPath } from "d3-geo";
import { useEffect, useRef } from "react";
import { merge, mesh } from "topojson-client";
import type {
  GeometryCollection,
  MultiPolygon,
  Polygon,
  Topology,
} from "topojson-specification";

interface GlobeLoaderProps {
  /** Logical pixel footprint of the (square) canvas. */
  size?: number;
  className?: string;
}

const INK = [20, 17, 13] as const;
const COUNTRIES_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json";

/**
 * Spinning ink-on-paper globe with comet-tail whirl arcs, drawn on a canvas.
 * Real country outlines are fetched from the world-atlas CDN at runtime; the
 * animation starts as soon as they resolve. Honors `prefers-reduced-motion` by
 * rendering a single static frame.
 *
 * Ported from the Claude Design "Globe Loader" sketch.
 */
export function GlobeLoader({ size = 200, className }: GlobeLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ink = (a: number) => `rgba(${INK[0]},${INK[1]},${INK[2]},${a})`;

    const DPR = Math.min(window.devicePixelRatio || 1, 2.5);
    canvas.width = size * DPR;
    canvas.height = size * DPR;
    ctx.scale(DPR, DPR);

    const cx = size / 2;
    const cy = size / 2;
    const R = size * 0.33; // globe radius (66 at the original 200px footprint)

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const projection = geoOrthographic()
      .scale(R)
      .translate([cx, cy])
      .clipAngle(90)
      .rotate([0, -16, 0]); // slight northern tilt

    const path = geoPath(projection, ctx);
    const graticule = geoGraticule10();
    const sphere = { type: "Sphere" } as const;

    let land: ReturnType<typeof merge> | null = null;
    let borders: ReturnType<typeof mesh> | null = null;

    // Comet-tail arc swept around the globe; alpha ramps 0 -> peak so the head
    // reads as the leading edge of motion and the tail fades out.
    function swoosh(
      r: number,
      start: number,
      sweep: number,
      peak: number,
      width: number,
      dir: number,
    ) {
      if (!ctx) return;
      const N = 46;
      ctx.lineCap = "round";
      ctx.lineWidth = width;
      for (let i = 0; i < N; i++) {
        const t0 = i / N;
        const t1 = (i + 1) / N;
        const a0 = start + dir * sweep * t0;
        const a1 = start + dir * sweep * t1;
        const a = peak * t1 ** 1.7;
        ctx.beginPath();
        ctx.strokeStyle = ink(a);
        ctx.arc(cx, cy, r, a0, a1);
        ctx.stroke();
      }
    }

    function orbitDot(r: number, ang: number, rad: number, a: number) {
      if (!ctx) return;
      const x = cx + Math.cos(ang) * r;
      const y = cy + Math.sin(ang) * r;
      ctx.beginPath();
      ctx.fillStyle = ink(a);
      ctx.arc(x, y, rad, 0, Math.PI * 2);
      ctx.fill();
    }

    function frame(now: number) {
      if (!ctx) return;
      const t = now / 1000;
      ctx.clearRect(0, 0, size, size);

      // spin the globe west-to-east
      projection.rotate([(t * 22) % 360, -16, 0]);

      ctx.beginPath();
      path(sphere);
      ctx.fillStyle = ink(0.035);
      ctx.fill();

      ctx.beginPath();
      path(graticule);
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = ink(0.13);
      ctx.stroke();

      if (land) {
        ctx.beginPath();
        path(land);
        ctx.fillStyle = ink(0.14);
        ctx.fill();
        ctx.lineWidth = 0.7;
        ctx.strokeStyle = ink(0.62);
        ctx.stroke();
      }
      if (borders) {
        ctx.beginPath();
        path(borders);
        ctx.lineWidth = 0.45;
        ctx.strokeStyle = ink(0.34);
        ctx.stroke();
      }

      // crisp limb (outer edge of the globe)
      ctx.beginPath();
      path(sphere);
      ctx.lineWidth = 1.1;
      ctx.strokeStyle = ink(0.9);
      ctx.stroke();

      const s1 = t * 1.9; // outer, clockwise
      const s2 = -t * 2.7; // inner, counter-clockwise
      swoosh(R + 16, s1, 2.5, 0.5, 2.2, 1);
      swoosh(R + 16, s1 + Math.PI, 2.2, 0.32, 1.6, 1);
      swoosh(R + 9, s2, 2.9, 0.42, 1.5, 1);

      orbitDot(R + 16, s1 + 2.5, 1.7, 0.65);
      orbitDot(R + 9, s2 + 2.9, 1.4, 0.5);
      orbitDot(R + 23, -t * 1.3, 1.2, 0.3);

      if (!reduce) raf = requestAnimationFrame(frame);
    }

    let raf = 0;
    const controller = new AbortController();

    fetch(COUNTRIES_URL, { signal: controller.signal })
      .then((r) => r.json() as Promise<Topology>)
      .then((topo) => {
        const obj = topo.objects.countries as GeometryCollection;
        const polygons = obj.geometries as (Polygon | MultiPolygon)[];
        land = merge(topo, polygons);
        borders = mesh(topo, obj, (a, b) => a !== b);
        if (reduce) frame(0);
        else raf = requestAnimationFrame(frame);
      })
      .catch(() => {
        // CDN unreachable/aborted — still draw the graticule globe + whirl.
        if (reduce) frame(0);
        else raf = requestAnimationFrame(frame);
      });

    return () => {
      controller.abort();
      cancelAnimationFrame(raf);
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Loading"
      style={{ width: size, height: size, display: "block" }}
      className={className}
    />
  );
}
