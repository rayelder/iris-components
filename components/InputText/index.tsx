"use client";

import { useState } from "react";

import styles from "./InputText.module.css";

interface InputTextProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
}

export default function InputText({ label, value, onChange }: InputTextProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const hasValue = inputValue.length > 0;
  const isLabelFloating = isFocused || hasValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div className={styles.base}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={styles.input}
      />
      <label
        className={`${styles.label} ${isLabelFloating ? styles.labelFloating : ""}`}
      >
        {label}
      </label>
    </div>
  );
}
