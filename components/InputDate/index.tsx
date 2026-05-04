"use client";

import { useEffect, useId, useState } from "react";

import { inputDateValidation } from "@/lib/schemas/shared";

import styles from "./InputDate.module.css";

const SEP = "/";

interface InputDateProps {
  label: string;
  value: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  shouldValidate?: boolean;
}

function digitsOnly(s: string) {
  return s.replace(/\D/g, "").slice(0, 8);
}

function digitsToFilled(digits: string): string {
  const d = digits.slice(0, 8);
  if (!d.length) return "";
  const mm = d.slice(0, Math.min(2, d.length));
  if (d.length <= 2) return mm;
  const ddPart = d.slice(2);
  const dd = ddPart.slice(0, Math.min(2, ddPart.length));
  const mid = `${mm}${SEP}${dd}`;
  if (d.length <= 4) return mid;
  const yyyy = d.slice(4);
  return `${mid}${SEP}${yyyy}`;
}

function maskSuffix(digitCount: number): string {
  switch (digitCount) {
    case 0:
      return "MM/DD/YYYY";
    case 1:
      return "M/DD/YYYY";
    case 2:
      return "/DD/YYYY";
    case 3:
      return "D/YYYY";
    case 4:
      return "/YYYY";
    case 5:
      return "YYY";
    case 6:
      return "YY";
    case 7:
      return "Y";
    default:
      return "";
  }
}

/** Clamp partial MM while typing (same idea as InputText cc expiry). */
function normalizeDigits(d: string): string {
  let next = digitsOnly(d).slice(0, 8);
  if (next.length === 1 && Number(next) > 1) {
    next = `0${next}`;
  }
  if (next.length >= 2) {
    const mm = Number(next.slice(0, 2));
    if (mm === 0) next = `01${next.slice(2)}`;
    else if (mm > 12) next = `12${next.slice(2)}`;
  }
  return next.slice(0, 8);
}

function allowDateKey(e: React.KeyboardEvent<HTMLInputElement>) {
  if (e.ctrlKey || e.metaKey || e.altKey) return true;
  const { key } = e;
  if (
    key === "Backspace" ||
    key === "Delete" ||
    key === "Tab" ||
    key === "Escape"
  ) {
    return true;
  }
  if (
    key === "ArrowLeft" ||
    key === "ArrowRight" ||
    key === "ArrowUp" ||
    key === "ArrowDown" ||
    key === "Home" ||
    key === "End"
  ) {
    return true;
  }
  return /^\d$/.test(key);
}

export default function InputDate({
  label,
  value,
  disabled = false,
  onChange,
  shouldValidate = false,
}: InputDateProps) {
  const id = useId();
  const errorId = useId();
  const [isFocused, setIsFocused] = useState(false);
  const [digits, setDigits] = useState(() => digitsOnly(value));
  const [error, setError] = useState("");

  useEffect(() => {
    setDigits(digitsOnly(value));
  }, [value]);

  const filled = digitsToFilled(digits);
  const mask = maskSuffix(digits.length);
  const showMirror = isFocused || digits.length > 0;
  const hasPartialDate = digits.length > 0 && digits.length < 8;
  const showMask =
    Boolean(mask) && (isFocused || (Boolean(error) && hasPartialDate));
  const inputDisplay = filled;
  const hasValue = digits.length > 0;
  const isLabelFloating = isFocused || hasValue;

  const validateInput = (raw: string) => {
    const result = inputDateValidation.safeParse(raw);
    setError(
      result.success ? "" : result.error.issues[0]?.message || "Invalid",
    );
  };

  useEffect(() => {
    if (shouldValidate) {
      validateInput(digits);
    }
  }, [shouldValidate]);

  const commitDigits = (next: string) => {
    const normalized = normalizeDigits(next);
    setDigits(normalized);
    onChange?.(normalized);
    return normalized;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const normalized = commitDigits(digitsOnly(e.target.value));
    if (error) {
      validateInput(normalized);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (digits.length === 0) {
      setError("");
      return;
    }
    validateInput(digits);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!allowDateKey(e)) {
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = digitsOnly(e.clipboardData.getData("text") || "");
    if (!pasted.length) return;
    const normalized = commitDigits(digits + pasted);
    if (error) {
      validateInput(normalized);
    }
  };

  const inputClassName = [
    disabled ? styles.disabled : styles.input,
    error ? styles.inputError : "",
  ]
    .filter(Boolean)
    .join(" ");

  const mirrorClassName = [
    styles.valueMirror,
  ]
    .filter(Boolean)
    .join(" ");

  const inputBaseClassName = [
    styles.inputBase,
    error ? styles.inputBaseInvalid : "",
    disabled ? styles.inputBaseDisabled : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.base}>
      <label className={styles.fieldShell} htmlFor={id}>
        <div className={inputBaseClassName}>
          {showMirror ? (
            <div className={mirrorClassName} aria-hidden>
              <span className={styles.filled}>{filled}</span>
              {showMask ? (
                <span className={styles.mask}>{mask}</span>
              ) : null}
            </div>
          ) : null}
          <input
            id={id}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={inputDisplay}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            className={inputClassName}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
          />
          <span
            className={`${styles.label} ${isLabelFloating ? styles.labelFloating : ""}`}
          >
            {label}
          </span>
        </div>
      </label>
      {error ? (
        <div id={errorId} className={styles.error} role="alert">
          {error}
        </div>
      ) : null}
    </div>
  );
}
