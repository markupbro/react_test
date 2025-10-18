import React from "react";
import styles from "./CheckBox.module.scss";

interface CheckboxProps {
  label?: React.ReactNode;
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
    <div
      className={`${styles.wrapper} ${
        className === "block" ? styles.block : ""
      }`}
    >
      <label
        htmlFor={id}
        className={`${styles.label} ${disabled ? styles.disabled : ""}
      ${!label && styles.nolabel}`}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          value={value}
          disabled={disabled}
          id={id}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
