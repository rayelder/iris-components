"use client";

import { useEffect, useState } from "react";

import { dateOfBirthValidation } from "@/lib/schemas/shared";

import styles from "../InputText/InputText.module.css";

interface InputDateProps {
  label: string;
  value: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  shouldValidate?: boolean;
  showTrailingIcon?: boolean;
}

function formatMMDDYYYY(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export default function InputDate({
  label,
  value,
  disabled = false,
  onChange,
  shouldValidate = false,
  showTrailingIcon = true,
}: InputDateProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState("");

  const hasValue = inputValue.length > 0;
  const isLabelFloating = isFocused || hasValue;

  const validateInput = (val: string) => {
    const result = dateOfBirthValidation.safeParse(val);
    setError(
      result.success ? "" : result.error.issues[0]?.message || "Invalid",
    );
  };

  useEffect(() => {
    if (shouldValidate) {
      validateInput(inputValue);
    }
  }, [shouldValidate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = formatMMDDYYYY(e.target.value);
    setInputValue(next);
    onChange?.(next);
  };

  const handleBlur = () => {
    setIsFocused(false);
    const result = dateOfBirthValidation.safeParse(inputValue);
    if (!result.success) {
      setError(result.error.issues[0].message);
    } else {
      setError("");
    }
  };

  return (
    <div className={styles.base}>
      <div className={styles.inputBase}>
        <input
          type="text"
          inputMode="numeric"
          autoComplete="bday"
          placeholder=""
          value={inputValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          className={`${disabled ? styles.disabled : styles.input} ${error ? styles.inputError : ""}`}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
        />
        <label
          className={`${styles.label} ${isLabelFloating ? styles.labelFloating : ""}`}
        >
          {label}
        </label>
        {showTrailingIcon && (
          <div className={styles.icon} aria-hidden>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8333 3.33334H15V2.50001C15 2.27989 14.9122 2.06893 14.7559 1.9126C14.5996 1.75627 14.3886 1.66834 14.1683 1.66834C13.9482 1.66834 13.7372 1.75627 13.5809 1.9126C13.4246 2.06893 13.3333 2.27989 13.3333 2.50001V3.33334H6.66667V2.50001C6.66667 2.27989 6.57874 2.06893 6.42241 1.9126C6.26608 1.75627 6.05511 1.66834 5.83499 1.66834C5.61487 1.66834 5.40391 1.75627 5.24758 1.9126C5.09125 2.06893 5.00332 2.27989 5.00332 2.50001V3.33334H4.16667C3.72464 3.33334 3.30072 3.50893 2.98816 3.82149C2.67559 4.13405 2.5 4.55797 2.5 5.00001V15.8333C2.5 16.2754 2.67559 16.6993 2.98816 17.0119C3.30072 17.3244 3.72464 17.5 4.16667 17.5H15.8333C16.2754 17.5 16.6993 17.3244 17.0119 17.0119C17.3244 16.6993 17.5 16.2754 17.5 15.8333V5.00001C17.5 4.55797 17.3244 4.13405 17.0119 3.82149C16.6993 3.50893 16.2754 3.33334 15.8333 3.33334ZM15.8333 15.8333H4.16667V8.33334H15.8333V15.8333ZM15.8333 6.66668H4.16667V5.00001H15.8333V6.66668Z"
                fill="#323D54"
              />
            </svg>
          </div>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
