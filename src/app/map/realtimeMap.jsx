import React, { useEffect, useRef } from "react";
import Map from "ol/Map.js";
import View from "ol/View.js";
import { fromLonLat } from "ol/proj.js";
import TileLayer from "ol/layer/Tile.js";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import XYZ from "ol/source/XYZ.js";
import GeoJSON from "ol/format/GeoJSON.js";
import Feature from "ol/Feature.js";
import Point from "ol/geom/Point.js";
import Style from "ol/style/Style.js";
import Icon from "ol/style/Icon.js";

// 컬러 스케일 6단계
const colors = [
  "#ffffcc",
  "#a1dab4",
  "#41b6c4",
  "#2c7fb8",
  "#253494",
  "#081d58",
];

// SVG 아이콘 생성 함수
function createSvgIcon(color) {
  return `data:image/svg+xml;utf8,
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" viewBox="0 0 24 36" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2C8 8 4 14 4 20a8 8 0 0 0 16 0c0-6-4-12-8-18z"/>
      <circle cx="12" cy="20" r="5" fill="${color}" />
    </svg>`;
}

// 데이터 값에 따른 단계 계산 (min~max 범위 내 6단계)
function getStep(value, min, max) {
  if (value <= min) return 1;
  if (value >= max) return 6;
  const stepSize = (max - min) / 6;
  return Math.min(6, Math.floor((value - min) / stepSize) + 1);
}

export default function RealTimeMap() {
  const mapRef = useRef(null);
  const vectorSourceRef = useRef(null);
  const mapRefInstance = useRef(null);
  const styleCache = useRef({});

  const format = new GeoJSON();

  // 실시간 시뮬레이션 데이터 함수 (10개 마커, value 랜덤 생성)
  const generateRandomData = () => {
    const features = [];
    const coords = [
      [126.9784, 37.5665], // 서울
      [129.0756, 35.1796], // 부산
      [127.3845, 36.3504], // 대전
      [126.7052, 35.8219], // 전주
      [129.3114, 35.5395], // 울산
      [127.0346, 37.6523], // 춘천
      [128.5912, 35.8889], // 대구
      [126.632, 33.489], // 제주
      [127.385, 36.35], // 세종
      [126.4478, 34.8756], // 광주
    ];

    coords.forEach((coord, i) => {
      features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: coord,
        },
        properties: {
          name: `도시 ${i + 1}`,
          value: Math.random() * 100, // 0~100 임의 값
          link: "https://example.com", // 링크 예시
        },
      });
    });

    return {
      type: "FeatureCollection",
      features,
    };
  };

  // 스타일 함수 (value에 따라 색상 다르게)
  const styleFunction = (feature) => {
    const value = feature.get("value");
    // 0~100 범위로 가정
    const step = getStep(value, 0, 100);

    if (!styleCache.current[step]) {
      const color = colors[step - 1];
      const svgIcon = createSvgIcon(color);
      styleCache.current[step] = new Style({
        image: new Icon({
          src: svgIcon,
          anchor: [0.5, 1],
          scale: 1,
        }),
      });
    }
    return styleCache.current[step];
  };

  // 피처 업데이트 함수
  const updateFeatures = (geojsonData) => {
    const newFeatures = format.readFeatures(geojsonData, {
      featureProjection: "EPSG:3857",
    });

    vectorSourceRef.current.clear();
    vectorSourceRef.current.addFeatures(newFeatures);
  };

  useEffect(() => {
    // 맵 생성
    vectorSourceRef.current = new VectorSource();

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

    mapRefInstance.current = map;

    // 초기 데이터 로딩
    updateFeatures(generateRandomData());

    // 마커 클릭 시 새 탭 열기
    map.on("singleclick", (evt) => {
      map.forEachFeatureAtPixel(evt.pixel, (feature) => {
        const link = feature.get("link");
        if (link) {
          window.open(link, "_blank");
        }
      });
    });

    // 마우스 포인터 변경 (pointer on feature)
    map.on("pointermove", (evt) => {
      const hit = map.hasFeatureAtPixel(evt.pixel);
      map.getTargetElement().style.cursor = hit ? "pointer" : "";
    });

    // 실시간 데이터 업데이트 시뮬레이션 (5초마다)
    const intervalId = setInterval(() => {
      const newData = generateRandomData();
      updateFeatures(newData);
    }, 5000);

    // 클린업
    return () => {
      clearInterval(intervalId);
      map.setTarget(null);
    };
  }, []);

  return (
    <div>
      <div ref={mapRef} style={{ width: "100%", height: "600px" }} />
    </div>
  );
}
