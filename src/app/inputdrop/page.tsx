"use client";
import React, { useState, useRef, useEffect } from "react";

// 임시 데이터
const items = [
  { id: 1, name: "Apple", desc: "사과" },
  { id: 2, name: "Banana", desc: "바나나" },
  { id: 3, name: "Orange", desc: "오렌지" },
  { id: 4, name: "Grape", desc: "포도" },
  { id: 5, name: "Pineapple", desc: "파인애플" },
];

const DropdownSearch: React.FC = () => {
  const [input, setInput] = useState("");
  const [filtered, setFiltered] = useState(items);
  const [showDropdown, setShowDropdown] = useState(false);
  const [view, setView] = useState(false);
  const [selected, setSelected] = useState<(typeof items)[0] | null>(null);
  const [prevSelected, setPrevSelected] = useState<(typeof items)[0] | null>(
    null
  );
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input) {
      setFiltered(
        items.filter(
          (item) =>
            item.name.toLowerCase().includes(input.toLowerCase()) ||
            item.desc.includes(input)
        )
      );
      setShowDropdown(true);
    } else {
      setFiltered(items);
      setShowDropdown(false);
    }
  }, [input]);

  // 바깥 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        // input 값이 변경되지 않았으면 이전 선택값을 다시 표시
        if (selected !== prevSelected) {
          setSelected(prevSelected);
        }
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [selected, prevSelected]);

  const handleSelect = (item: (typeof items)[0]) => {
    setPrevSelected(item);
    setSelected(item);
    setInput("");
    setShowDropdown(false);
    setView(true);
  };

  // input이 blur될 때 값이 변경되지 않았으면 이전 선택값을 다시 표시
  const handleBlur = () => {
    if (selected !== prevSelected) {
      setSelected(prevSelected);
    }
    setShowDropdown(false);
  };

  const handleViewClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      setView(!view);
    }
  };

  return (
    <div
      ref={wrapperRef}
      style={{ maxWidth: 320, margin: "40px auto", position: "relative" }}
    >
      {selected && (
        <div
          style={{
            zIndex: view ? 2 : -1,
            position: "absolute",
            marginBottom: 8,
            width: "100%",
            height: 34,
            padding: 8,
            background: "#f5f5f5",
            borderRadius: 4,
            border: "1px solid #ddd",
          }}
          onClick={handleViewClick}
        >
          <strong>{selected.name}</strong> - {selected.desc}
        </div>
      )}
      <input
        type="text"
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        // placeholder="검색어를 입력하세요"
        style={{
          zIndex: view ? -1 : 2,
          position: "relative",
          width: "100%",
          height: 34,
          padding: 8,
          borderRadius: 4,
          border: "1px solid #ccc",
          background: "#fff",
        }}
        onFocus={() => input && setShowDropdown(true)}
        onBlur={handleBlur}
        autoComplete="off"
      />
      {showDropdown && filtered.length > 0 && (
        <ul
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 38,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 4,
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            margin: 0,
            padding: 0,
            listStyle: "none",
            zIndex: 10,
            maxHeight: 180,
            overflowY: "auto",
          }}
        >
          {filtered.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item)}
              style={{
                padding: "10px 16px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
              onMouseDown={(e) => e.preventDefault()} // input blur 방지
            >
              <strong>{item.name}</strong>{" "}
              <span style={{ color: "#888" }}>{item.desc}</span>
            </li>
          ))}
        </ul>
      )}
      {showDropdown && filtered.length === 0 && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 44,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 4,
            padding: "12px 16px",
            color: "#888",
            zIndex: 10,
          }}
        >
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
};

export default DropdownSearch;
