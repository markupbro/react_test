import React from "react";
import styles from "./Textarea.module.scss";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  size?: "sm" | "md" | "lg"; // 크기 옵션 추가
  label?: string;
  id: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ onChange, error, required, size = "md", label, id, ...props }, ref) => {
    const [touched, setTouched] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setTouched(true);
      props.onBlur?.(e);
    };

    const isEmpty =
      props.value === "" || props.value === null || props.value === undefined;

    const showError =
      touched && ((required && isEmpty) || (!required && !!error));

    return (
      <div className={`${styles.wrapper} ${size ? styles[size] : ""}`}>
        {label && (
          <label htmlFor={id} className={`${styles.label}`}>
            {label}
            {required && <span className={styles.requiredMark}>*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          {...props}
          required={required}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{
            minHeight: 80,
            ...props.style,
          }}
          className={styles.textarea}
        />
        {required ? (
          <>
            {showError && (
              <div style={{ color: "#e53935", fontSize: 13, marginTop: 4 }}>
                {required && isEmpty ? "필수 입력 항목입니다." : error}
              </div>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
);

export default Textarea;
