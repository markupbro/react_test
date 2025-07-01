import React, { useRef, useState, useEffect } from "react";
import styles from "./CustomSelect.module.scss";

export interface CustomSelectOption {
  value: string | number;
  label: React.ReactNode;
  disabled?: boolean;
}

interface CustomSelectProps {
  options: CustomSelectOption[];
  value: string | number | null;
  onChange: (value: string | number) => void;
  label?: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  error?: string;
  required?: boolean;
  id?: string;
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = "선택하세요",
  size = "md",
  disabled = false,
  error,
  required = false,
  id,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const [focusIdx, setFocusIdx] = useState<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // 드롭다운 열릴 때 포커스 인덱스 초기화
  useEffect(() => {
    if (open) {
      const idx = options.findIndex(
        (opt) => opt.value === value && !opt.disabled
      );
      setFocusIdx(idx >= 0 ? idx : options.findIndex((opt) => !opt.disabled));
      // 드롭다운 열릴 때 첫 번째 활성 옵션에 포커스
      setTimeout(() => {
        if (
          listRef.current &&
          focusIdx !== null &&
          listRef.current.children[focusIdx]
        ) {
          (listRef.current.children[focusIdx] as HTMLElement).focus();
        }
      }, 0);
    } else {
      setFocusIdx(null);
    }
    // eslint-disable-next-line
  }, [open]);

  // 키보드 접근성: 버튼
  const handleButtonKeyDown = (e: React.KeyboardEvent) => {
    if (
      (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") &&
      !open
    ) {
      e.preventDefault();
      setOpen(true);
      setTouched(true);
    }
  };

  // 키보드 접근성: 옵션
  const handleOptionKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      let next = idx + 1;
      while (next < options.length && options[next].disabled) next++;
      if (next >= options.length)
        next = options.findIndex((opt) => !opt.disabled);
      setFocusIdx(next);
      (listRef.current?.children[next] as HTMLElement)?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      let prev = idx - 1;
      while (prev >= 0 && options[prev].disabled) prev--;
      if (prev < 0) prev = options.length - 1;
      while (prev >= 0 && options[prev].disabled) prev--;
      if (prev < 0) prev = options.findIndex((opt) => !opt.disabled);
      setFocusIdx(prev);
      (listRef.current?.children[prev] as HTMLElement)?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!options[idx].disabled) {
        onChange(options[idx].value);
        setOpen(false);
        buttonRef.current?.focus();
      }
    } else if (e.key === "Escape" || e.key === "Tab") {
      setOpen(false);
      buttonRef.current?.focus();
    }
  };

  // Tab 접근성: 드롭다운 열리면 옵션에만 Tab, 닫히면 버튼에 Tab
  useEffect(() => {
    if (!open) return;
    if (listRef.current && focusIdx !== null) {
      (listRef.current.children[focusIdx] as HTMLElement)?.focus();
    }
  }, [focusIdx, open]);

  const selected = options.find((opt) => opt.value === value);
  const isValueEmpty = value === "" || value === null || value === undefined;
  const showError =
    touched && ((required && isValueEmpty) || (!!error && !required));

  return (
    <div className={`${styles.wrapper} ${size} ${className}`} ref={wrapperRef}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
          {required && <span className={styles.requiredMark}>*</span>}
        </label>
      )}
      <button
        type="button"
        className={`${styles.selectBox} ${showError ? styles.errorSelect : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id ? `${id}-listbox` : undefined}
        aria-invalid={showError}
        onClick={() => !disabled && setOpen((v) => !v)}
        onBlur={() => setTouched(true)}
        onKeyDown={handleButtonKeyDown}
        disabled={disabled}
        id={id}
        ref={buttonRef}
        tabIndex={open ? -1 : 0}
      >
        <span className={selected ? styles.selected : styles.placeholder}>
          {selected ? selected.label : placeholder}
        </span>
        <span className={styles.arrow} aria-hidden>
          ▼
        </span>
      </button>
      {open && (
        <ul
          className={styles.dropdown}
          role="listbox"
          id={id ? `${id}-listbox` : undefined}
          ref={listRef}
        >
          {options.map((opt, i) => (
            <li
              key={opt.value}
              className={`${styles.option} ${
                opt.value === value ? styles.selectedOption : ""
              } ${focusIdx === i ? styles.focusedOption : ""} ${
                opt.disabled ? styles.disabledOption : ""
              }`}
              role="option"
              aria-selected={opt.value === value}
              aria-disabled={opt.disabled}
              tabIndex={opt.disabled ? -1 : 0}
              onClick={() => {
                if (!opt.disabled) {
                  onChange(opt.value);
                  setOpen(false);
                  buttonRef.current?.focus();
                }
              }}
              onKeyDown={(e) => handleOptionKeyDown(e, i)}
              onFocus={() => setFocusIdx(i)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
      {showError && (
        <div className={styles.error}>
          {required && isValueEmpty ? "필수 선택 항목입니다." : error}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
