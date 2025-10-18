"use client";
import React, { useState } from "react";

export const GridTest: React.FC = () => {
  const [gridTemplateRows, setGridTemplateRows] = useState("60px 1fr 60px");
  const [gridTemplateColumns, setGridTemplateColumns] = useState("1fr ");

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows,
        gridTemplateColumns,
        width: "100%",
        height: "100vh",
      }}
    >
      <div style={{ backgroundColor: "#f0f0f0" }}>Header</div>
      <div style={{ backgroundColor: "#e0e0e0" }}>Content</div>
      <div style={{ backgroundColor: "#d0d0d0" }}>Footer</div>
    </div>
  );
};

export default GridTest;
