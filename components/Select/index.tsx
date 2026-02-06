"use client";

import { useState, useRef, useEffect } from "react";

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
}

export default function Select({
  label,
  value,
  options,
  disabled = false,
  onChange,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectValue, setSelectValue] = useState(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const hasValue = selectValue.length > 0;
  const isLabelFloating = isOpen || hasValue;

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

  return (
    <div className={styles.base} ref={dropdownRef}>
      <div
        className={`${styles.select} ${disabled ? styles.disabled : ""} ${
          isOpen ? styles.selectOpen : ""
        }`}
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
              {option.value === selectValue && <Icon name="check" />}
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
