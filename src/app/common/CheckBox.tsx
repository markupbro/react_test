import React from "react";
import "./CheckBox.scss";

export interface CheckboxProps {
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
  return (
    <label className={className}>
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
