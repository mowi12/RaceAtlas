import { create } from "zustand";
import { exampleEvents } from "@/lib/data/example-events";
import type { Event } from "@/lib/types/event";

/**
 * Zustand-backed store holding all running events.
 *
 * This store acts as the single source of truth for events
 * across all views.
 */
interface EventState {
  /**
   * All known events (single source of truth).
   */
  events: Event[];

  /**
   * Replace the entire event list.
   */
  setEvents: (events: Event[]) => void;

  /**
   * Add a new event (admin usage).
   */
  addEvent: (event: Event) => void;

  /**
   * Update an existing event by id (admin usage).
   */
  updateEvent: (event: Event) => void;
}

/**
 * Hook providing access to the global event store.
 */
export const useEventStore = create<EventState>((set) => ({
  events: exampleEvents,

  setEvents: (events) => set({ events }),

  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, event],
    })),

  updateEvent: (updatedEvent) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event,
      ),
    })),
}));
