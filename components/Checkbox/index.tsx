"use client";

import { useState } from "react";
import styles from "./Checkbox.module.css";

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M14 4L6 12L2 8"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className={styles.label}>{label}</span>
    </label>
  );
}
