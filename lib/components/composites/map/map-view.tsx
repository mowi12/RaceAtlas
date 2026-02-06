"use client";

import maplibregl from "maplibre-gl";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapStyleToggle } from "@/lib/components/composites/map/map-style-toggle";
import { getLocalizedText } from "@/lib/i18n/localized-text";
import type { Event } from "@/lib/types/event";

const DEFAULT_CENTER: [number, number] = [9.98, 48.4];
const DEFAULT_ZOOM = 10;

const STYLE_OPTIONS = [
  {
    id: "arcgis-hybrid",
    label: "ArcGIS Hybrid",
    url: "https://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/arcgis_hybrid.json",
  },
  {
    id: "openfreemap-liberty",
    label: "OpenFreeMap Liberty",
    url: "https://tiles.openfreemap.org/styles/liberty",
  },
] as const;

type MapViewProps = {
  events: Event[];
  locale: string;
  onEventSelectAction?: (eventId: Event["id"]) => void;
};

export function MapView({ events, locale, onEventSelectAction }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const lastStyleUrlRef = useRef<string | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [styleId, setStyleId] = useState<(typeof STYLE_OPTIONS)[number]["id"]>(
    STYLE_OPTIONS[1].id,
  );

  const styleUrl = useMemo(() => {
    return (
      STYLE_OPTIONS.find((option) => option.id === styleId)?.url ??
      STYLE_OPTIONS[0].url
    );
  }, [styleId]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) {
      return;
    }

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: styleUrl,
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
      attributionControl: false,
    });

    const geolocate = new maplibregl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: false,
      showUserLocation: true,
      showAccuracyCircle: true,
      fitBoundsOptions: { maxZoom: 13 },
    });

    map.addControl(new maplibregl.AttributionControl({ compact: true }));
    map.addControl(new maplibregl.NavigationControl(), "top-right");
    map.addControl(geolocate, "top-right");
    map.on("load", () => {
      map.resize();
      geolocate.trigger();
    });

    mapRef.current = map;
    lastStyleUrlRef.current = styleUrl;

    const resizeObserver = new ResizeObserver(() => {
      map.resize();
    });
    resizeObserver.observe(containerRef.current);
    map.resize();

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
      lastStyleUrlRef.current = null;
    };
  }, [styleUrl]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (lastStyleUrlRef.current === styleUrl) return;
    map.setStyle(styleUrl);
    lastStyleUrlRef.current = styleUrl;
  }, [styleUrl]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((marker) => {
      marker.remove();
    });
    markersRef.current = [];

    const locationCounts = new Map<string, number>();

    events.forEach((event) => {
      if (!event.location) return;
      const locationKey = `${event.location.latitude.toFixed(5)}:${event.location.longitude.toFixed(5)}`;
      const index = locationCounts.get(locationKey) ?? 0;
      locationCounts.set(locationKey, index + 1);

      const angle = (index * Math.PI * 2) / 8;
      const ring = Math.floor(index / 8) + 1;
      const metersOffset = 15 * ring;
      const latOffset = (metersOffset / 111_320) * Math.cos(angle);
      const lngOffset =
        (metersOffset / (111_320 * Math.cos((event.location.latitude * Math.PI) / 180))) *
        Math.sin(angle);

      const adjustedLat = event.location.latitude + latOffset;
      const adjustedLng = event.location.longitude + lngOffset;

      const name = getLocalizedText(event.name, locale);
      const popup = new maplibregl.Popup({ offset: 20 }).setText(name);
      const marker = new maplibregl.Marker()
        .setLngLat([adjustedLng, adjustedLat])
        .setPopup(popup)
        .addTo(map);
      marker.getElement().addEventListener("click", (eventClick) => {
        eventClick.stopPropagation();
        onEventSelectAction?.(event.id);
      });
      markersRef.current.push(marker);
    });

    return () => {
      markersRef.current.forEach((marker) => {
        marker.remove();
      });
      markersRef.current = [];
    };
  }, [events, locale, onEventSelectAction]);

  return (
    <div className="relative h-full w-full min-h-0">
      <div ref={containerRef} className="h-full w-full" />
      <div className="absolute left-2.5 top-2.5 z-10">
        <MapStyleToggle
          options={STYLE_OPTIONS}
          value={styleId}
          onChangeAction={setStyleId}
        />
      </div>
    </div>
  );
}
