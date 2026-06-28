import type { EventLocation } from "./geo";
import type { Race, RaceDetail } from "./race";

export { EventStatus } from "@/generated/prisma/enums";

import type { EventStatus } from "@/generated/prisma/enums";

export interface EventLink {
  id: string;
  label: string;
  url: string;
}

export interface EventListItem {
  id: string;
  slug: string;
  name: string;
  /** YYYY-MM-DD, plain calendar date — no timezone. */
  date: string;
  location: EventLocation;
  races: Race[];
}

export interface EventDetail extends Omit<EventListItem, "races"> {
  description?: string;
  status: EventStatus;
  links: EventLink[];
  races: RaceDetail[];
}
