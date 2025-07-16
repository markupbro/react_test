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
  required?: boolean;
}

export interface InputGroupProps {
  children: React.ReactNode;
  className?: string;
  alingItem?: string;
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
  required = false,
  ...props
}) => {
  console.log(required);
  return (
    <div
      className={`${styles.wrapper} ${styles[inputSize]} ${
        wrapperClassName || ""
      } ${label ? "" : styles["no-label"]}`}
    >
      {label && (
        <label
          htmlFor={props.id}
          className={`${styles.label} ${labelClassName || ""}`}
        >
          {label}
          {required && <span className={styles.requiredMark}>*</span>}
        </label>
      )}
      {/* {error && errorPosition === "top" && (
        <div className={`${styles.error} ${errorClassName || ""}`}>{error}</div>
      )} */}
      <input
        className={`
          ${styles.input}
          ${required && error ? styles.errorInput : ""}
          ${inputClassName || ""}
        `}
        {...props}
      />
      {required ? (
        <>
          {error && errorPosition === "bottom" && (
            <div className={`${styles.error} ${errorClassName || ""}`}>
              {error}
            </div>
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export const InputGroupWrap: React.FC<InputGroupProps> = ({
  children,
  className,
  alingItem,
}) => {
  return (
    <div
      className={`${styles["group-wrapper"]} ${alingItem ? styles.end : ""} ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default Input;
