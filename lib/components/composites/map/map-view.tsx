"use client";

import maplibregl from "maplibre-gl";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapStyleToggle } from "@/lib/components/composites/map/map-style-toggle";

const DEFAULT_CENTER: [number, number] = [0, 20];
const DEFAULT_ZOOM = 1.6;

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

export function MapView() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const lastStyleUrlRef = useRef<string | null>(null);
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

    map.addControl(new maplibregl.AttributionControl({ compact: true }));
    map.addControl(new maplibregl.NavigationControl(), "top-right");
    map.on("load", () => {
      map.resize();
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
