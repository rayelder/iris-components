"use client";

import { useState, useRef, useEffect } from "react";
import {
  reasonForContactValidation,
  stateValidation,
  countryValidation,
} from "@/lib/schemas/shared";

import Icon from "@/components/Icon";
import styles from "./Select.module.css";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  value: string;
  options: SelectOption[];
  disabled?: boolean;
  onChange?: (value: string) => void;
  validationSchema?: "reasonForContact" | "country" | "state";
  shouldValidate?: boolean;
}

export default function Select({
  label,
  value,
  options,
  disabled = false,
  onChange,
  validationSchema,
  shouldValidate = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [selectValue, setSelectValue] = useState(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const hasValue = selectValue.length > 0;
  const isLabelFloating = isOpen || hasValue;

  const getValidationSchema = (type?: string) => {
    switch (type) {
      case "country":
        return countryValidation;
      case "state":
        return stateValidation;
      case "reasonForContact":
        return reasonForContactValidation;
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
      validateInput(selectValue);
    }
  }, [shouldValidate]);

  const selectedOption = options.find((opt) => opt.value === selectValue);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (optionValue: string) => {
    setSelectValue(optionValue);
    setIsOpen(false);
    onChange?.(optionValue);

    setError("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Change event:", e.target.value);
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
      <div className={styles.selectBase} ref={dropdownRef}>
        <div
          className={`${styles.select} ${disabled ? styles.disabled : ""} ${
            isOpen ? styles.selectOpen : ""
          }  ${error ? styles.selectError : ""}`}
          onClick={handleToggle}
          role="button"
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleToggle();
            }
          }}
        >
          {selectedOption?.label}
        </div>
        <label
          className={`${styles.label} ${isLabelFloating ? styles.labelFloating : ""}`}
        >
          {label}
        </label>
        <div className={styles.arrow}>
          {!isOpen ? <Icon name="down" /> : <Icon name="up" />}
        </div>
        {isOpen && (
          <ul className={styles.dropdown}>
            {options.map((option) => (
              <li
                key={option.value}
                className={`${styles.option} ${
                  option.value === selectValue ? styles.optionSelected : ""
                }`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
                {option.value === selectValue && <Icon name="check" />}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
