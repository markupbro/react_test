import React from "react";
import styles from "./Button.module.scss";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}) => {
  return (
    <button
      className={[
        styles.button,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : "",
        loading ? styles.loading : "",
        className,
      ].join(" ")}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className={styles.spinner} aria-label="로딩 중" />
      ) : (
        <>
          {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
          <span className={styles.text}>{children}</span>
          {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
