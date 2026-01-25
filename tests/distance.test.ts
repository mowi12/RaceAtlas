import { describe, expect, it } from "vitest";
import { distanceInKm } from "@/lib/geo/distance";
import type { GeoPoint } from "@/lib/types/geo";

describe("distanceInKm", () => {
  const innsbruck: GeoPoint = { latitude: 47.2682, longitude: 11.3923 };
  const vienna: GeoPoint = { latitude: 48.2082, longitude: 16.3738 };
  const samePoint: GeoPoint = { latitude: 0, longitude: 0 };

  it("returns 0 for the same point", () => {
    expect(distanceInKm(samePoint, samePoint)).toBeCloseTo(0, 5);
  });

  it("is symmetric", () => {
    expect(distanceInKm(innsbruck, vienna)).toBeCloseTo(
      distanceInKm(vienna, innsbruck),
      5,
    );
  });

  it("calculates known distance approximately", () => {
    expect(distanceInKm(innsbruck, vienna)).toBeCloseTo(386.8, 1);
  });

  it("handles small distances correctly", () => {
    const pointA: GeoPoint = { latitude: 47.2682, longitude: 11.3923 };
    const pointB: GeoPoint = { latitude: 47.2683, longitude: 11.3924 };
    const distance = distanceInKm(pointA, pointB);
    expect(distance).toBeGreaterThan(0);
    expect(distance).toBeLessThan(0.02); // ~20 meters
  });

  it("handles equator crossing", () => {
    const north: GeoPoint = { latitude: 1, longitude: 30 };
    const south: GeoPoint = { latitude: -1, longitude: 30 };
    expect(distanceInKm(north, south)).toBeCloseTo(222, 0);
  });
});
