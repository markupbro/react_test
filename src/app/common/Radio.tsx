import React from "react";
import styles from "./Radio.module.scss";

interface RadioProps {
  label: React.ReactNode;
  checked: boolean;
  onChange: () => void;
  value?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
}

const Radio: React.FC<RadioProps> = ({
  label,
  checked,
  onChange,
  value,
  disabled = false,
  id,
  name,
  className = "",
}) => {
  return (
    <div
      className={`${styles.wrapper} ${
        className === "block" ? styles.block : ""
      }`}
    >
      <label className={`${styles.label} ${disabled ? styles.disabled : ""}`}>
        <input
          type="radio"
          checked={checked}
          onChange={onChange}
          value={value}
          name={name}
          id={id}
          disabled={disabled}
        />
        {label}
      </label>
    </div>
  );
};

export default Radio;
