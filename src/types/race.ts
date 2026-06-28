import type { Route } from "./route";

export { RaceDifficulty, Surface } from "@/generated/prisma/enums";

import type { RaceDifficulty, Surface } from "@/generated/prisma/enums";

export interface RaceCapacity {
  cap: number;
  taken: number;
  waitlist: boolean;
}

export interface Race {
  id: string;
  eventId: string;
  /** Advertised race name, e.g. "Marathon Trail" — not a derived label. */
  name: string;
  /** Source of truth — never overwritten by GPX-derived values. */
  distanceMeters: number;
  elevationGainMeters?: number;
  difficulty?: RaceDifficulty;
  /** Event-local time, HH:mm. */
  startTime?: string;
  surface?: Surface;
  capacity?: RaceCapacity;
}

/** Race with route metadata — only used in EventDetail. */
export interface RaceDetail extends Race {
  route?: Route;
}
