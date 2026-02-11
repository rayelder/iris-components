"use client";

import { useState, useEffect } from "react";
import styles from "./Checkbox.module.css";
import Icon from "../Icon";

import {
  paymentMethodValidation,
  shippingAddressValidation,
} from "@/lib/schemas/shared";

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  validationSchema?: "paymentMethod" | "shippingAddress";
  shouldValidate?: boolean;
}

export default function Checkbox({
  label,
  checked = false,
  onChange,
  disabled = false,
  validationSchema,
  shouldValidate = false,
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);
  const [error, setError] = useState("");

  const getValidationSchema = (type?: string) => {
    switch (type) {
      case "paymentMethod":
        return paymentMethodValidation;
      case "shippingAddress":
        return shippingAddressValidation;

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
      validateInput(isChecked ? "valid" : ""); // Assuming "valid" is a placeholder for actual validation logic
    }
  }, [shouldValidate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    setIsChecked(newChecked);
    setError("");
    onChange?.(newChecked);
  };

  // const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const result = getValidationSchema(validationSchema)?.safeParse(
  //     e.target.value,
  //   );

  //   if (result && !result.success) {
  //     setError(result.error.issues[0].message);
  //   } else {
  //     setError("");
  //   }
  // };

  return (
    <div className={styles.base}>
      <label
        className={`${styles.inputBase} ${disabled ? styles.disabled : ""}`}
      >
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          // onBlur={handleBlur}
          disabled={disabled}
          tabIndex={0}
          className={`${disabled ? styles.disabled : styles.input} ${error ? styles.inputError : ""}`}
        />
        <span className={styles.checkmark}>
          <Icon name="check" color="#fff" stroke="3" />
        </span>
        <span className={styles.label}>{label}</span>
      </label>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
