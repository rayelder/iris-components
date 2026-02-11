"use client";

import { useState, useEffect } from "react";
import { messageValidation } from "@/lib/schemas/shared";

// import { useState } from "react";
import styles from "./Textarea.module.css";

interface TextareaProps {
  label: string;
  value: string;
  disabled?: boolean;
  rows?: number;
  onChange?: (value: string) => void;
  validationSchema?: "message";
  shouldValidate?: boolean;
}

export default function Textarea({
  label,
  value,
  disabled = false,
  rows = 4,
  onChange,
  validationSchema,
  shouldValidate = false,
}: TextareaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [textareaValue, setTextareaValue] = useState(value);
  const [error, setError] = useState("");

  const hasValue = textareaValue.length > 0;
  const isLabelFloating = isFocused || hasValue;

  const getValidationSchema = (type?: string) => {
    switch (type) {
      case "message":
        return messageValidation;
      default:
        return null;
    }
  };

  const validateInput = (val: string) => {
    const schema = getValidationSchema(validationSchema);
    if (!schema) return;
    const result = schema.safeParse(val);
    setError(
      result.success ? "" : result.error.issues[0]?.message || "Invalid",
    );
  };

  useEffect(() => {
    if (shouldValidate) {
      validateInput(textareaValue);
    }
  }, [shouldValidate, textareaValue]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
    onChange?.(e.target.value);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);

    const result = getValidationSchema(validationSchema)?.safeParse(
      e.target.value,
    );

    if (result && !result.success) {
      setError(result.error.issues[0].message);
    } else {
      setError("");
    }
  };

  return (
    <div className={styles.base}>
      <div className={styles.textareaBase}>
        <textarea
          value={textareaValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          className={`${disabled ? styles.disabled : styles.textarea} ${error ? styles.textareaError : ""}`}
          disabled={disabled}
          rows={rows}
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
