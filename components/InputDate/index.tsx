"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

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

/** Count of digit characters strictly before display index `pos`. */
function displayIndexToDigitIndex(filled: string, pos: number): number {
  let di = 0;
  const end = Math.max(0, Math.min(pos, filled.length));
  for (let i = 0; i < end; i++) {
    if (/\d/.test(filled[i])) di++;
  }
  return di;
}

/** Display caret position after `digitIndex` digits (0 … length). */
function digitIndexToDisplayIndex(filled: string, digitIndex: number): number {
  if (digitIndex <= 0) return 0;
  let seen = 0;
  for (let i = 0; i < filled.length; i++) {
    if (/\d/.test(filled[i])) {
      seen++;
      if (seen === digitIndex) return i + 1;
    }
  }
  return filled.length;
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

export default function InputDate({
  label,
  value,
  disabled = false,
  onChange,
  shouldValidate = false,
}: InputDateProps) {
  const id = useId();
  const errorId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingCaretDigitIndexRef = useRef<number | null>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [digits, setDigits] = useState(() => digitsOnly(value));
  const [error, setError] = useState("");

  useEffect(() => {
    setDigits(digitsOnly(value));
    pendingCaretDigitIndexRef.current = null;
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
  const showClear = hasValue && !disabled;

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

  const commitWithCaret = (nextDigitsRaw: string, caretDigitIndex: number) => {
    const normalized = normalizeDigits(nextDigitsRaw);
    const caret = Math.max(0, Math.min(caretDigitIndex, normalized.length));
    pendingCaretDigitIndexRef.current = caret;
    setDigits(normalized);
    onChange?.(normalized);
    if (normalized.length === 0) {
      setError("");
    } else if (error || normalized.length === 8) {
      validateInput(normalized);
    }
  };

  useLayoutEffect(() => {
    const caret = pendingCaretDigitIndexRef.current;
    const el = inputRef.current;
    if (caret === null || !el) return;
    if (document.activeElement !== el) {
      pendingCaretDigitIndexRef.current = null;
      return;
    }
    pendingCaretDigitIndexRef.current = null;
    const f = digitsToFilled(digits);
    const pos = digitIndexToDisplayIndex(f, caret);
    el.setSelectionRange(pos, pos);
  }, [digits]);

  const getSelectionDigitRange = (filledStr: string) => {
    const el = inputRef.current;
    const start = el?.selectionStart ?? filledStr.length;
    const end = el?.selectionEnd ?? start;
    const a = Math.min(start, end);
    const b = Math.max(start, end);
    return {
      startD: displayIndexToDigitIndex(filledStr, a),
      endD: displayIndexToDigitIndex(filledStr, b),
    };
  };

  const insertDigitsAtSelection = (insertText: string) => {
    const filledStr = digitsToFilled(digits);
    const { startD, endD } = getSelectionDigitRange(filledStr);
    const lo = Math.min(startD, endD);
    const hi = Math.max(startD, endD);
    const incoming = digitsOnly(insertText);
    if (!incoming.length) return;
    const merged = digits.slice(0, lo) + incoming + digits.slice(hi);
    const clipped = merged.slice(0, 8);
    const normalized = normalizeDigits(clipped);
    const caret =
      lo +
      incoming.length +
      Math.max(0, normalized.length - clipped.length);
    commitWithCaret(clipped, Math.min(caret, normalized.length));
  };

  const handleBeforeInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (disabled) return;
    const ie = e.nativeEvent as InputEvent;
    if (ie.inputType === "insertText" && ie.data && /^\d+$/.test(ie.data)) {
      e.preventDefault();
      insertDigitsAtSelection(ie.data);
    }
  };

  const handleChange = (_e: React.ChangeEvent<HTMLInputElement>) => {
    /* Edits via beforeInput, keydown, paste, clear */
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    const filledStr = digitsToFilled(digits);
    const { startD, endD } = getSelectionDigitRange(filledStr);
    const lo = Math.min(startD, endD);
    const hi = Math.max(startD, endD);
    const collapsed = lo === hi;

    if (e.key === "Backspace") {
      e.preventDefault();
      let next: string;
      let caret: number;
      if (!collapsed) {
        next = digits.slice(0, lo) + digits.slice(hi);
        caret = lo;
      } else if (lo > 0) {
        next = digits.slice(0, lo - 1) + digits.slice(lo);
        caret = lo - 1;
      } else {
        return;
      }
      commitWithCaret(next, caret);
      return;
    }

    if (e.key === "Delete") {
      e.preventDefault();
      let next: string;
      let caret: number;
      if (!collapsed) {
        next = digits.slice(0, lo) + digits.slice(hi);
        caret = lo;
      } else if (lo < digits.length) {
        next = digits.slice(0, lo) + digits.slice(lo + 1);
        caret = lo;
      } else {
        return;
      }
      commitWithCaret(next, caret);
      return;
    }

    if (e.key === "Home") {
      e.preventDefault();
      const pos = digitIndexToDisplayIndex(filledStr, 0);
      queueMicrotask(() => inputRef.current?.setSelectionRange(pos, pos));
      return;
    }

    if (e.key === "End") {
      e.preventDefault();
      const pos = digitIndexToDisplayIndex(filledStr, digits.length);
      queueMicrotask(() => inputRef.current?.setSelectionRange(pos, pos));
      return;
    }

    if (/^\d$/.test(e.key)) {
      e.preventDefault();
      if (collapsed && digits.length >= 8 && lo >= digits.length) {
        return;
      }
      let merged: string;
      if (collapsed && digits.length >= 8) {
        merged = digits.slice(0, lo) + e.key + digits.slice(lo + 1);
      } else {
        merged = digits.slice(0, lo) + e.key + digits.slice(hi);
      }
      const clipped = merged.slice(0, 8);
      const normalized = normalizeDigits(clipped);
      const caret =
        lo +
        1 +
        Math.max(0, normalized.length - clipped.length);
      commitWithCaret(clipped, Math.min(caret, normalized.length));
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    e.preventDefault();
    insertDigitsAtSelection(e.clipboardData.getData("text") || "");
  };

  const handleBlur = () => {
    setIsFocused(false);
    pendingCaretDigitIndexRef.current = null;
    if (digits.length === 0) {
      setError("");
      return;
    }
    validateInput(digits);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleClick = () => {
    requestAnimationFrame(() => {
      const el = inputRef.current;
      if (!el || document.activeElement !== el) return;
      const f = digitsToFilled(digits);
      const pos = el.selectionStart ?? 0;
      if (pos < f.length && f[pos] === SEP) {
        const di = displayIndexToDigitIndex(f, pos);
        const nextPos = digitIndexToDisplayIndex(f, di);
        el.setSelectionRange(nextPos, nextPos);
      }
    });
  };

  const handleClearMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleClearClick = (e: React.MouseEvent) => {
    e.preventDefault();
    pendingCaretDigitIndexRef.current = 0;
    setDigits("");
    onChange?.("");
    setError("");
    queueMicrotask(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, 0);
    });
  };

  const inputClassName = [
    disabled ? styles.disabled : styles.input,
    showClear && !disabled ? styles.inputWithIcon : "",
    error ? styles.inputError : "",
  ]
    .filter(Boolean)
    .join(" ");

  const mirrorClassName = [styles.valueMirror, showClear ? styles.valueMirrorWithIcon : ""]
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
      <div className={styles.fieldShell}>
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
            ref={inputRef}
            id={id}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={inputDisplay}
            onChange={handleChange}
            onBeforeInput={handleBeforeInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onClick={handleClick}
            className={inputClassName}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
          />
          <label
            htmlFor={id}
            className={`${styles.label} ${isLabelFloating ? styles.labelFloating : ""}`}
          >
            {label}
          </label>
          {showClear ? (
            <button
              type="button"
              className={styles.clearButton}
              aria-label={`Clear ${label}`}
              onMouseDown={handleClearMouseDown}
              onClick={handleClearClick}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
      {error ? (
        <div id={errorId} className={styles.error} role="alert">
          {error}
        </div>
      ) : null}
    </div>
  );
}
