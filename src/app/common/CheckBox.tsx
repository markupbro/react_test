import React from "react";

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
    <label
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        value={value}
        disabled={disabled}
        id={id}
        style={{ marginRight: 4 }}
      />
      {label}
    </label>
  );
};

export default Checkbox;
