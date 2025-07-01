import React from "react";
import styles from "./Input.module.scss";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  errorPosition?: "top" | "bottom"; // error 위치 선택
  inputSize?: "sm" | "md" | "lg"; // 크기 옵션 추가
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
}

export interface InputGroupProps {
  children: React.ReactNode;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  errorPosition = "bottom", // 기본값은 'bottom'
  inputSize = "md",
  wrapperClassName,
  labelClassName,
  inputClassName,
  errorClassName,
  ...props
}) => {
  return (
    <div
      className={`${styles.wrapper} ${styles[inputSize]} ${
        wrapperClassName || ""
      }`}
    >
      {label && (
        <label
          htmlFor={props.id}
          className={`${styles.label} ${labelClassName || ""}`}
        >
          {label}
        </label>
      )}
      {error && errorPosition === "top" && (
        <div className={`${styles.error} ${errorClassName || ""}`}>{error}</div>
      )}
      <input
        className={`
          ${styles.input}
          ${error ? styles.errorInput : ""}
          ${inputClassName || ""}
        `}
        {...props}
      />
      {error && errorPosition === "bottom" && (
        <div className={`${styles.error} ${errorClassName || ""}`}>{error}</div>
      )}
    </div>
  );
};

export const InputGroupWrap: React.FC<InputGroupProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`${styles["group-wrapper"]} ${className || ""}`}>
      {children}
    </div>
  );
};

export default Input;
