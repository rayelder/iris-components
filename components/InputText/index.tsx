"use client";

import { useState } from "react";
import { z } from "zod";
import { ccNameValidation, ccNumberValidation } from "@/lib/schemas/shared";

import styles from "./InputText.module.css";

interface InputTextProps {
  label: string;
  value: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  validationSchema?: "ccName" | "ccNumber";
}

export default function InputText({
  label,
  value,
  disabled = false,
  onChange,
  validationSchema,
}: InputTextProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState("");

  const hasValue = inputValue.length > 0;
  const isLabelFloating = isFocused || hasValue;

  const getValidationSchema = (type?: string) => {
    switch (type) {
      case "ccName":
        return ccNameValidation;
      case "ccNumber":
        return ccNumberValidation;
      default:
        return null;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e.target.value);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFocused(false);
    // console.log("Input value on blur:", e);

    // Validate when user leaves the field
    const result = getValidationSchema(validationSchema)?.safeParse(
      e.target.value,
    );

    // console.log("Result ->", result);

    if (result && !result.success) {
      setError(result.error.issues[0].message);
    } else {
      setError("");
    }
  };

  return (
    <div>
      <div className={styles.base}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          className={`${disabled ? styles.disabled : styles.input} ${error ? styles.inputError : ""}`}
          disabled={disabled}
        />
        <label
          className={`${styles.label} ${isLabelFloating ? styles.labelFloating : ""}`}
        >
          {label}
        </label>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
