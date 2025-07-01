"use client";
import React, { useState } from "react";

const dummyData = [
  "Apple",
  "Banana",
  "Orange",
  "Grape",
  "Pineapple",
  "Strawberry",
  "Watermelon",
  "Mango",
  "Peach",
  "Cherry",
];

const SearchWithData: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<string[]>(dummyData);

  const handleSearch = () => {
    const filtered = dummyData.filter((item) =>
      item.toLowerCase().includes(keyword.trim().toLowerCase())
    );
    setResults(filtered);
  };

  const handleReset = () => {
    setKeyword("");
    setResults(dummyData);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div style={{ maxWidth: 320, margin: "40px auto" }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="검색어를 입력하세요"
          style={{
            flex: 1,
            padding: 8,
            borderRadius: 4,
            border: "1px solid #ccc",
          }}
        />
        <button
          type="button"
          onClick={handleSearch}
          style={{
            padding: "8px 16px",
            borderRadius: 4,
            background: "#1976d2",
            color: "#fff",
            border: "none",
          }}
        >
          검색
        </button>
        <button
          type="button"
          onClick={handleReset}
          style={{
            padding: "8px 16px",
            borderRadius: 4,
            background: "#eee",
            color: "#333",
            border: "none",
          }}
        >
          초기화
        </button>
      </div>
      <ul style={{ marginTop: 24 }}>
        {results.length === 0 ? (
          <li style={{ color: "#888" }}>검색 결과가 없습니다.</li>
        ) : (
          results.map((item) => <li key={item}>{item}</li>)
        )}
      </ul>
    </div>
  );
};

export default SearchWithData;
