"use client";
import React, { useState, useRef, useEffect } from "react";

// 로컬 데이터
const localItems = [
  { id: 1, name: "Apple", desc: "사과" },
  { id: 2, name: "Banana", desc: "바나나" },
  { id: 3, name: "Orange", desc: "오렌지" },
  { id: 4, name: "Grape", desc: "포도" },
  { id: 5, name: "Pineapple", desc: "파인애플" },
];

const SearchSelect: React.FC = () => {
  const [input, setInput] = useState("");
  const [dropdown, setDropdown] = useState<typeof localItems>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState<(typeof localItems)[0] | null>(null);
  const [showSelected, setShowSelected] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 검색어 입력 시 로컬 데이터에서 필터링
  useEffect(() => {
    if (input) {
      const filtered = localItems.filter(
        (item) =>
          item.name.toLowerCase().includes(input.toLowerCase()) ||
          item.desc.includes(input)
      );
      setDropdown(filtered);
      setShowDropdown(true);
    } else {
      setDropdown([]);
      setShowDropdown(false);
    }
  }, [input]);

  // 바깥 클릭 시 처리
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        if (!input && selected) {
          setShowSelected(true);
        }
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [input, selected]);

  // input이 blur될 때(포커스 아웃) 처리
  const handleBlur = () => {
    setTimeout(() => {
      if (!input && selected) {
        setShowSelected(true);
      }
      setShowDropdown(false);
    }, 100); // 클릭 이벤트와 충돌 방지
  };

  // div 클릭 시 input 활성화
  const handleShowInput = () => {
    setShowSelected(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // item 선택
  const handleSelect = (item: (typeof localItems)[0]) => {
    setSelected(item);
    setShowSelected(true);
    setInput("");
    setShowDropdown(false);
  };

  return (
    <div
      ref={wrapperRef}
      style={{ maxWidth: 340, margin: "40px auto", position: "relative" }}
    >
      {showSelected && selected && (
        <div
          onClick={handleShowInput}
          style={{
            marginBottom: 8,
            padding: 10,
            background: "#f5f5f5",
            borderRadius: 4,
            border: "1.5px solid #1976d2",
            cursor: "pointer",
            fontWeight: 500,
            color: "#1976d2",
            transition: "background 0.15s",
          }}
        >
          <strong>{selected.name}</strong> - {selected.desc}
          <span
            style={{
              float: "right",
              color: "#888",
              fontWeight: 400,
              fontSize: 13,
            }}
          >
            (다시 검색)
          </span>
        </div>
      )}
      {!showSelected && (
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowDropdown(!!input)}
          onBlur={handleBlur}
          placeholder="검색어를 입력하세요"
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 4,
            border: "1.5px solid #1976d2",
            fontSize: 16,
            boxSizing: "border-box",
          }}
          autoComplete="off"
        />
      )}
      {showDropdown && (
        <ul
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: showSelected ? 56 : 44,
            background: "#fff",
            border: "1.5px solid #1976d2",
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
          {dropdown.length === 0 ? (
            <li style={{ padding: "12px 16px", color: "#888" }}>
              검색 결과가 없습니다.
            </li>
          ) : (
            dropdown.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelect(item)}
                style={{
                  padding: "10px 16px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                  background: selected?.id === item.id ? "#e3f2fd" : "#fff",
                  fontWeight: selected?.id === item.id ? 600 : 400,
                }}
                onMouseDown={(e) => e.preventDefault()} // input blur 방지
              >
                <strong>{item.name}</strong>{" "}
                <span style={{ color: "#888" }}>{item.desc}</span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchSelect;
