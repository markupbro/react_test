"use client";

import { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import Overlay from "ol/Overlay";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import JSON5 from "json5"; // dynamic import below used; static import is safe here for TS typing but we will dynamic-import in runtime
// NOTE: we'll dynamic import json5 to avoid build-time module type issues.

type Status = "normal" | "good" | "caution" | "warning" | "danger" | "error";

interface Device {
  name: string;
  lon: number;
  lat: number;
  status?: Status;
  link?: string;
}

const STATUS_COLORS: Record<Status, string> = {
  normal: "#00E676",
  good: "#00B0FF",
  caution: "#FFD740",
  warning: "#FF9100",
  danger: "#FF5252",
  error: "#9E9E9E",
};

export default function MapPage() {
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const overlaysRef = useRef<Overlay[]>([]);
  const mapRef = useRef<Map | null>(null);
  const devicesRef = useRef<Device[]>([]);

  useEffect(() => {
    let intervalId: number | undefined;
    let json5: any = null;

    async function init() {
      if (!mapDivRef.current) return;

      // 1) dynamic import json5 (avoids static import build-time issues)
      try {
        json5 = await import("json5");
      } catch (e) {
        console.error(
          "Failed to dynamic-import json5, make sure 'json5' is installed.",
          e
        );
        return;
      }

      // 2) fetch JSON5 from public
      let text: string;
      try {
        const res = await fetch(`/data/devices.json5?ts=${Date.now()}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        text = await res.text();
      } catch (err) {
        console.error("Failed to fetch devices.json5:", err);
        return;
      }

      // 3) parse JSON5
      let parsed: any;
      try {
        parsed = json5.parse(text);
      } catch (err) {
        console.error("JSON5 parse error:", err);
        return;
      }

      const devices: Device[] = parsed?.devices ?? [];
      devicesRef.current = devices;

      // 4) create map
      const map = new Map({
        target: mapDivRef.current,
        layers: [
          new TileLayer({
            source: new XYZ({
              url: "https://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
              maxZoom: 19,
              // ✅ 세계지도가 좌우로 반복되지 않게
              wrapX: false,
            }),
          }),
        ],
        view: new View({
          center: fromLonLat([0, 20]),
          zoom: 2,
          // ✅ 드래그 제한 설정
          constrainOnlyCenter: true,
          extent: [-22000000, -Infinity, 22000000, Infinity],
        }),
      });
      mapRef.current = map;

      // 5) create overlays ONCE (do not recreate every update)
      overlaysRef.current = []; // ensure empty
      devices.forEach((dev) => {
        const el = document.createElement("div");
        el.className = "ol-device-marker";
        el.title = dev.name || "";
        el.style.backgroundColor =
          STATUS_COLORS[(dev.status || "normal") as Status];
        el.style.cursor = "pointer";
        el.style.transition = "background-color 1.2s ease, transform 0.2s ease";
        // optional hover scale (pure CSS) handled below in style

        // click opens link in new tab
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          if (dev.link) window.open(dev.link, "_blank");
        });

        const overlay = new Overlay({
          position: fromLonLat([dev.lon, dev.lat]),
          positioning: "center-center",
          element: el,
          stopEvent: false,
        });

        map.addOverlay(overlay);
        overlaysRef.current.push(overlay);
      });

      // 6) fit view to show all markers (compute extent in EPSG:3857)
      if (overlaysRef.current.length > 0) {
        let minX = Infinity,
          minY = Infinity,
          maxX = -Infinity,
          maxY = -Infinity;
        overlaysRef.current.forEach((ov) => {
          const el = ov.getElement() as HTMLElement;
          const pos = ov.getPosition(); // in EPSG:3857 because we used fromLonLat
          if (pos && Array.isArray(pos)) {
            const [x, y] = pos as [number, number];
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
          }
        });
        if (minX !== Infinity) {
          const padding = [60, 60, 60, 60];
          map.getView().fit([minX, minY, maxX, maxY], {
            padding,
            duration: 400,
            maxZoom: 6,
          });
        }
      }

      // 7) pointer cursor - detect overlay under cursor manually (since overlays not features)
      // we set cursor:pointer on marker elements themselves; also ensure map container cursor default
      const mapEl = map.getTargetElement();
      if (mapEl) mapEl.style.cursor = "";

      // 8) periodic random update: change only marker div background-color (no overlay recreate)
      intervalId = window.setInterval(() => {
        overlaysRef.current.forEach((ov) => {
          const el = ov.getElement() as HTMLElement | null;
          if (!el) return;
          // pick random status
          const statuses: Status[] = [
            "normal",
            "good",
            "caution",
            "warning",
            "danger",
            "error",
          ];
          const s = statuses[Math.floor(Math.random() * statuses.length)];
          el.style.backgroundColor = STATUS_COLORS[s];
        });
      }, 1000);
    } // init()

    init();

    return () => {
      if (intervalId) window.clearInterval(intervalId);
      const map = mapRef.current;
      if (map) map.setTarget(undefined);
      overlaysRef.current = [];
      mapRef.current = null;
    };
  }, []);

  return (
    <>
      <div
        ref={mapDivRef}
        style={{ width: "100%", height: "400px", background: "#000" }}
      />
      <style jsx global>{`
        /* marker base */
        .ol-device-marker {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.6);
          transform: translate(-50%, -100%); /* center bottom */
          display: block;
        }
        /* hover effect */
        .ol-device-marker:hover {
          transform: translate(-50%, -100%) scale(1.2);
        }
      `}</style>
    </>
  );
}
