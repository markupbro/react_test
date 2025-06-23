"use client";

import Image from "next/image";
import styles from "./page.module.css";
import React, { useState } from "react";

const initialUsers = [
  { id: 1, name: "홍길동" },
  { id: 2, name: "김철수" },
  { id: 3, name: "이영희" },
];

export default function Page() {
  const [users] = useState(initialUsers);
  const [checked, setChecked] = useState<number[]>([]);

  const handleCheck = (userId: number) => {
    setChecked((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const selectedNames = users
    .filter((user) => checked.includes(user.id))
    .map((user) => user.name);

  let displayText = "없음";
  if (selectedNames.length === 1) {
    displayText = selectedNames[0];
  } else if (selectedNames.length > 1) {
    displayText = `${selectedNames.length}명`;
  }

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 24,
        borderRadius: 16,
        background: "#f9fafb",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: 24 }}>
        회원 목록
      </h2>
      <div
        style={{
          fontWeight: 600,
          fontSize: 18,
          color: "#1976d2",
          marginBottom: 12,
          textAlign: "center",
        }}
      >
        {!users || users.length === 0
          ? "회원"
          : users.length === 1
          ? users.map((user) => user.name)
          : `${users.length}명`}
      </div>
      {!users || users.length === 0 ? (
        <div style={{ textAlign: "center", color: "#aaa", margin: "24px 0" }}>
          회원
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, marginBottom: 24 }}>
          {users.map((user) => (
            <li
              key={user.id}
              style={{
                marginBottom: 12,
                background: checked.includes(user.id) ? "#e3f2fd" : "#fff",
                borderRadius: 8,
                padding: "8px 12px",
                transition: "background 0.2s",
              }}
            >
              <label
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type="checkbox"
                  checked={checked.includes(user.id)}
                  onChange={() => handleCheck(user.id)}
                  style={{ marginRight: 10, accentColor: "#1976d2" }}
                />
                <span
                  style={{
                    fontWeight: checked.includes(user.id) ? 700 : 400,
                    color: checked.includes(user.id) ? "#1976d2" : "#333",
                  }}
                >
                  {user.name}
                </span>
              </label>
            </li>
          ))}
        </ul>
      )}
      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          padding: "16px 0",
          textAlign: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <h3
          style={{ margin: 0, color: "#1976d2", fontWeight: 700, fontSize: 18 }}
        >
          선택된 회원
        </h3>
        <div
          style={{
            marginTop: 8,
            fontSize: 16,
            color: displayText === "없음" ? "#aaa" : "#333",
            fontWeight: displayText === "없음" ? 400 : 600,
          }}
        >
          {displayText}
        </div>
      </div>
    </div>
  );
}
