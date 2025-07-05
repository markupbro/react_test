import React from "react";
import styles from "./CheckBox.module.scss";

interface CheckboxProps {
  label: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  value?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  value,
  disabled = false,
  id,
  className = "",
}) => {
  // const disabledClass = disabled ? "disabled" : "";
  // console.log(styles);

  return (
    <label
      className={`${styles.label} ${className} ${
        disabled ? styles.disabled : ""
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        value={value}
        disabled={disabled}
        id={id}
      />
      {label}
    </label>
  );
};

export default Checkbox;
