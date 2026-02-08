import { describe, expect, it } from "vitest";
import { distanceInKm } from "@/lib/geo/distance";
import type { GeoPoint } from "@/lib/types/geo";

describe("distanceInKm", () => {
  it("returns 0 for identical points", () => {
    const point: GeoPoint = { latitude: 48.398497, longitude: 9.991246 }; // Ulm
    const distance = distanceInKm(point, point);

    expect(distance).toBeCloseTo(0, 6);
  });

  it("is symmetric (distance a→b equals b→a)", () => {
    const a: GeoPoint = { latitude: 48.85889, longitude: 2.320041 }; // Paris
    const b: GeoPoint = { latitude: 51.507446, longitude: -0.127765 }; // London

    const ab = distanceInKm(a, b);
    const ba = distanceInKm(b, a);

    expect(ab).toBeCloseTo(ba, 10);
  });

  it("calculates a known long-distance correctly (Paris ↔ London)", () => {
    const paris: GeoPoint = { latitude: 48.85889, longitude: 2.320041 }; // Paris
    const london: GeoPoint = { latitude: 51.507446, longitude: -0.127765 }; // London

    const distance = distanceInKm(paris, london);

    // Real-world distance is ~343 km
    expect(distance).toBeCloseTo(343, -1);
  });

  it("calculates a small distance correctly", () => {
    const a: GeoPoint = { latitude: 48.398497, longitude: 9.991246 }; // Ulm Münster
    const b: GeoPoint = { latitude: 48.397108, longitude: 9.993107 }; // Ulm Town Hall

    const distance = distanceInKm(a, b);

    expect(distance).toBeGreaterThan(0);
    expect(distance).toBeLessThan(1); // < 1 km
  });

  it("handles points on the equator correctly", () => {
    const a: GeoPoint = { latitude: 0, longitude: 0 };
    const b: GeoPoint = { latitude: 0, longitude: 1 };

    const distance = distanceInKm(a, b);

    // 1 degree longitude at equator ≈ 111.32 km
    expect(distance).toBeCloseTo(111, 0);
  });
});
