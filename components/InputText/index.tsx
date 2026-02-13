"use client";

import { useState, useEffect } from "react";
import {
  ccNameValidation,
  ccNumberValidation,
  emailValidation,
  expirationValidation,
  firstNameValidation,
  lastNameValidation,
  nameValidation,
  securityCodeValidation,
  streetAddressValidation,
  cityValidation,
  zipCodeValidation,
} from "@/lib/schemas/shared";

import Icon from "../Icon";

import styles from "./InputText.module.css";

interface InputTextProps {
  type?: "text" | "ccNumber" | "ccExpiration";
  label: string;
  value: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  validationSchema?:
    | "city"
    | "ccName"
    | "ccNumber"
    | "email"
    | "expiration"
    | "name"
    | "securityCode"
    | "firstName"
    | "lastName"
    | "streetAddress"
    | "zipCode";
  showTrailingIcon?: boolean;
  shouldValidate?: boolean;
}

export default function InputText({
  type = "text",
  label,
  value,
  disabled = false,
  onChange,
  validationSchema,
  showTrailingIcon = false,
  shouldValidate = false,
}: InputTextProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [cardType, setCardType] = useState("unknown");
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
      case "email":
        return emailValidation;
      case "expiration":
        return expirationValidation;
      case "name":
        return nameValidation;
      case "firstName":
        return firstNameValidation;
      case "lastName":
        return lastNameValidation;
      case "securityCode":
        return securityCodeValidation;
      case "streetAddress":
        return streetAddressValidation;
      case "city":
        return cityValidation;
      case "zipCode":
        return zipCodeValidation;
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
      validateInput(inputValue);
    }
  }, [shouldValidate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (type) {
      case "ccNumber":
        setInputValue(formatCardNumber(e.target.value));
        setCardType(detectCardType(e.target.value));
        break;
      case "ccExpiration":
        setInputValue(formatExpiry(e.target.value));
        break;
      default:
        setInputValue(e.target.value);
        break;
    }
    onChange?.(e.target.value);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  function formatExpiry(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 4); // MMYY max

    if (digits.length === 0) return "";

    // First 2 digits = month
    let mm = digits.slice(0, 2);

    // Optional: clamp month while typing
    if (mm.length === 1 && Number(mm) > 1) {
      mm = `0${mm}`; // e.g. "9" -> "09"
    } else if (mm.length === 2) {
      const n = Number(mm);
      if (n === 0) mm = "01";
      else if (n > 12) mm = "12";
    }

    const yy = digits.slice(2, 4);
    return yy ? `${mm}/${yy}` : mm;
  }

  return (
    <div className={styles.base}>
      <div className={styles.inputBase}>
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
        {cardType === "mastercard" && (
          <div className={styles.ccIcon}>
            <svg
              width="35"
              height="22"
              viewBox="0 0 35 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="34"
                height="21"
                rx="1.5"
                fill="white"
              />
              <rect
                x="0.5"
                y="0.5"
                width="34"
                height="21"
                rx="1.5"
                stroke="#D3DBE3"
              />
              <path
                d="M20.3349 5.98814H14.653V16.0117H20.3349V5.98814Z"
                fill="#FF5F00"
              />
              <path
                d="M15.0137 10.9999C15.0128 10.0346 15.2356 9.08171 15.6653 8.2134C16.095 7.3451 16.7203 6.58414 17.4939 5.98815C16.5359 5.24897 15.3855 4.78929 14.174 4.66164C12.9625 4.53399 11.7388 4.74352 10.6429 5.26629C9.547 5.78906 8.62302 6.60398 7.97658 7.6179C7.33014 8.63181 6.98734 9.80381 6.98734 10.9999C6.98734 12.1961 7.33014 13.3681 7.97658 14.382C8.62302 15.3959 9.547 16.2108 10.6429 16.7336C11.7388 17.2564 12.9625 17.4659 14.174 17.3383C15.3855 17.2106 16.5359 16.7509 17.4939 16.0117C16.7203 15.4157 16.095 14.6548 15.6653 13.7865C15.2356 12.9182 15.0128 11.9653 15.0137 10.9999Z"
                fill="#EB001B"
              />
              <path
                d="M28 10.9999C28 12.1961 27.6572 13.3681 27.0108 14.382C26.3644 15.3959 25.4405 16.2108 24.3446 16.7336C23.2487 17.2564 22.0251 17.4659 20.8136 17.3383C19.6021 17.2106 18.4517 16.7509 17.4937 16.0117C18.2666 15.4151 18.8914 14.6541 19.3211 13.7859C19.7507 12.9177 19.9739 11.9651 19.9739 10.9999C19.9739 10.0348 19.7507 9.08216 19.3211 8.21399C18.8914 7.34582 18.2666 6.58475 17.4937 5.98814C18.4517 5.24897 19.6021 4.78928 20.8136 4.66163C22.0251 4.53399 23.2487 4.74353 24.3446 5.26631C25.4405 5.78908 26.3644 6.604 27.0108 7.61792C27.6572 8.63183 28 9.80383 28 10.9999Z"
                fill="#F79E1B"
              />
              <path
                d="M27.3806 14.9501V14.7449H27.4649V14.7031H27.2502V14.7449H27.3345V14.9501H27.3806ZM27.7973 14.9501V14.7027H27.7315L27.6558 14.8729L27.5801 14.7027H27.5143V14.9501H27.5608V14.7635L27.6317 14.9244H27.6799L27.7509 14.7631V14.9501H27.7973Z"
                fill="#F79E1B"
              />
            </svg>
          </div>
        )}
        {cardType === "visa" && (
          <div className={styles.ccIcon}>
            <svg
              width="35"
              height="22"
              viewBox="0 0 35 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="34"
                height="21"
                rx="1.5"
                fill="white"
              />
              <rect
                x="0.5"
                y="0.5"
                width="34"
                height="21"
                rx="1.5"
                stroke="#D3DBE3"
              />
              <path
                d="M13.7174 6.45104L9.99955 15.5426L7.58846 15.5367L5.78759 8.26957C5.67828 7.82196 5.58268 7.65785 5.24735 7.46857C4.69987 7.16025 3.79524 6.87004 2.99913 6.68934L3.05388 6.42499L6.935 6.43447C7.42972 6.43568 7.87361 6.77666 7.9845 7.36494L8.9321 12.6333L11.321 6.44503L13.7174 6.45089L13.7174 6.45104ZM23.1495 12.6034C23.165 10.2015 19.9377 10.0613 19.9626 8.98841C19.9703 8.66188 20.2723 8.31543 20.9319 8.22842C21.2589 8.18506 22.1594 8.15358 23.1796 8.64119L23.5849 6.71232C23.0366 6.50537 22.331 6.30577 21.4524 6.30363C19.1979 6.29812 17.6082 7.53124 17.5905 9.30248C17.5728 10.6126 18.718 11.3465 19.5811 11.7839C20.469 12.2319 20.7666 12.5191 20.7623 12.9179C20.7545 13.5283 20.0511 13.7961 19.3943 13.8051C18.2478 13.8206 17.5834 13.4805 17.0537 13.2248L16.6354 15.2175C17.1678 15.4711 18.1509 15.6937 19.1708 15.7073C21.567 15.7131 23.1375 14.4953 23.1495 12.6034ZM29.0955 15.5892L31.2051 15.5944L29.3859 6.48932L27.4388 6.48456C27.001 6.48349 26.6311 6.74571 26.4666 7.14985L23.0233 15.5744L25.4183 15.5802L25.8971 14.2221L28.8235 14.2292L29.0955 15.5892ZM26.5584 12.3585L27.7673 8.9445L28.4499 12.3631L26.5584 12.3585ZM16.9763 6.459L15.068 15.5549L12.7872 15.5494L14.6962 6.45343L16.9763 6.459Z"
                fill="#1434CB"
              />
            </svg>
          </div>
        )}

        {showTrailingIcon && (
          <div className={styles.icon}>
            <Icon />
          </div>
        )}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}

function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1  ");
}

function detectCardType(input: string) {
  const digits = input.replace(/\D/g, "");

  // Visa
  if (/^4/.test(digits)) return "visa";

  // Mastercard: 51-55 or 2221-2720, length 16
  const firstTwo = Number(digits.slice(0, 2));
  const firstFour = Number(digits.slice(0, 4));

  const isMcPrefix =
    (firstTwo >= 51 && firstTwo <= 55) ||
    (firstFour >= 2221 && firstFour <= 2720);

  if (isMcPrefix) {
    return "mastercard";
  }

  return "unknown";
}
