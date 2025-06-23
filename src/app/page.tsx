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

  // 선택된 이름 배열
  const selectedNames = users
    .filter((user) => checked.includes(user.id))
    .map((user) => user.name);

  // 조건에 따른 표시 텍스트
  let displayText = "없음";
  if (selectedNames.length === 1) {
    displayText = selectedNames[0];
  } else if (selectedNames.length > 1) {
    displayText = `${selectedNames.length}명`;
  }

  return (
    <div>
      <h2>회원 목록</h2>
      <div>
        {!users || users.length === 0
          ? "회원"
          : users.length === 1
          ? users.map((user) => user.name)
          : `${users.length}명`}
      </div>
      {!users || users.length === 0 ? (
        <div>회원</div>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <label>
                <input
                  type="checkbox"
                  checked={checked.includes(user.id)}
                  onChange={() => handleCheck(user.id)}
                />
                {user.name}
              </label>
            </li>
          ))}
        </ul>
      )}
      <h3>선택된 회원</h3>
      <div>{displayText}</div>
    </div>
  );
}
