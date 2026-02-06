"use client";

import { useState } from "react";
import styles from "./Textarea.module.css";

interface TextareaProps {
  label: string;
  value: string;
  disabled?: boolean;
  rows?: number;
  onChange?: (value: string) => void;
}

export default function Textarea({
  label,
  value,
  disabled = false,
  rows = 4,
  onChange,
}: TextareaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [textareaValue, setTextareaValue] = useState(value);

  const hasValue = textareaValue.length > 0;
  const isLabelFloating = isFocused || hasValue;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div className={styles.base}>
      <textarea
        value={textareaValue}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={disabled ? styles.disabled : styles.textarea}
        disabled={disabled}
        rows={rows}
      />
      <label
        className={`${styles.label} ${isLabelFloating ? styles.labelFloating : ""}`}
      >
        {label}
      </label>
    </div>
  );
}
