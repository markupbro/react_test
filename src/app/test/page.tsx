"use client";
// TestViewer.tsx
import React, { useState } from "react";
import { GridTest } from "./gridtest";

// 파일명과 컴포넌트 매핑
const componentMap: Record<string, React.FC> = {
  GridTest,
};

const TestViewer: React.FC = () => {
  const [fileName, setFileName] = useState("GridTest"); // 기본값

  const Comp = componentMap[fileName];

  return (
    <div>
      <select value={fileName} onChange={(e) => setFileName(e.target.value)}>
        {Object.keys(componentMap).map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <div style={{ marginTop: 24 }}>
        {Comp ? <Comp /> : <div>해당 파일이 없습니다.</div>}
      </div>
    </div>
  );
};

export default TestViewer;
