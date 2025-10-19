"use client";

import { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import { fromLonLat } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";
import GeoJSON from "ol/format/GeoJSON";
import Feature, { FeatureLike } from "ol/Feature";
import { Style, Icon } from "ol/style";

// 색상 스케일
const colors = [
  "#00E676", // 정상 (Green)
  "#00B0FF", // 양호 (Sky Blue)
  "#FFD740", // 주의 (Amber)
  "#FF9100", // 경고 (Orange)
  "#FF5252", // 위험 (Red)
  "#9E9E9E", // 장애 (Gray)
];

// SVG 아이콘 (OpenLayers 10 → 반드시 encodeURIComponent)
function createSvgIcon(color: string): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" viewBox="0 0 24 36" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2C8 8 4 14 4 20a8 8 0 0 0 16 0c0-6-4-12-8-18z"/>
      <circle cx="12" cy="20" r="5" fill="${color}" />
    </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

// 값 → 단계 계산
function getStep(value: number, min: number, max: number): number {
  if (value <= min) return 1;
  if (value >= max) return 6;
  const stepSize = (max - min) / 6;
  return Math.min(6, Math.floor((value - min) / stepSize) + 1);
}

export default function RealTimeMapPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const vectorSourceRef = useRef<VectorSource>(new VectorSource());
  const styleCache = useRef<Record<number, Style>>({});
  const format = new GeoJSON();

  // 랜덤 데이터 생성
  const generateRandomData = () => {
    const coords = [
      [126.9784, 37.5665],
      [129.0756, 35.1796],
      [127.3845, 36.3504],
      [126.7052, 35.8219],
      [129.3114, 35.5395],
      [127.0346, 37.6523],
      [128.5912, 35.8889],
      [126.632, 33.489],
      [127.385, 36.35],
      [126.4478, 34.8756],
    ];

    return {
      type: "FeatureCollection",
      features: coords.map((coord, i) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: coord,
        },
        properties: {
          name: `도시 ${i + 1}`,
          value: Math.random() * 100,
          link: "https://example.com",
        },
      })),
    };
  };

  // 스타일 함수
  const styleFunction = (feature: FeatureLike) => {
    const value = feature.get("value") as number;
    const step = getStep(value, 0, 100);
    if (!styleCache.current[step]) {
      const color = colors[step - 1];
      const svgIcon = createSvgIcon(color);
      styleCache.current[step] = new Style({
        image: new Icon({
          src: svgIcon,
          anchor: [0.5, 1],
          scale: 1.2,
        }),
      });
    }
    return styleCache.current[step];
  };

  // 피처 업데이트
  const updateFeatures = (geojsonData: any) => {
    const newFeatures = format.readFeatures(geojsonData, {
      dataProjection: "EPSG:4326",
      featureProjection: "EPSG:3857",
    });
    vectorSourceRef.current.clear();
    vectorSourceRef.current.addFeatures(newFeatures);
  };

  // 지도 초기화
  useEffect(() => {
    if (!mapRef.current) return;

    const vectorLayer = new VectorLayer({
      source: vectorSourceRef.current,
      style: styleFunction,
    });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
            maxZoom: 19,
          }),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([127.0, 37.5]),
        zoom: 6,
      }),
    });

    // 초기 마커 표시
    updateFeatures(generateRandomData());

    // 클릭 이벤트
    map.on("singleclick", (evt) => {
      map.forEachFeatureAtPixel(evt.pixel, (feature) => {
        const link = feature?.get("link") as string;
        if (link) window.open(link, "_blank");
      });
    });

    // 마우스 커서
    map.on("pointermove", (evt) => {
      const hit = map.hasFeatureAtPixel(evt.pixel);
      (map.getTargetElement() as HTMLElement).style.cursor = hit
        ? "pointer"
        : "";
    });

    // 5초마다 실시간 갱신
    const interval = setInterval(() => {
      updateFeatures(generateRandomData());
    }, 5000);

    return () => {
      clearInterval(interval);
      map.setTarget(undefined);
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "50vh", backgroundColor: "#000" }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
