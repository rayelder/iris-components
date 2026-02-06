"use client";

import { useState } from "react";
import styles from "./Checkbox.module.css";
import Icon from "../Icon";

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export default function Checkbox({
  label,
  checked = false,
  onChange,
  disabled = false,
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("Mouse up event:", e);
    const newChecked = e.target.checked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <label className={`${styles.base} ${disabled ? styles.disabled : ""}`}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        className={styles.input}
      />
      <span className={styles.checkmark}>
        <Icon name="check" color="#fff" stroke="3" />
      </span>
      <span className={styles.label}>{label}</span>
    </label>
  );
}
