"use client";

import { useState } from "react";

import styles from "./QuantitySelector.module.css";

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  const clamp = (value: number, min = 0, max = 4) =>
    Math.min(max, Math.max(min, value));

  const decrementQuantity = () => {
    setQuantity((previousQuantity) => clamp(previousQuantity - 1));
  };

  const incrementQuantity = () => {
    setQuantity((previousQuantity) => clamp(previousQuantity + 1));
  };

  return (
    <div className={styles.base}>
      <button
        type="button"
        className={styles.controlButton}
        onClick={decrementQuantity}
        aria-label="Decrease quantity"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="30" height="30" rx="4" fill="white" />
          <path
            d="M20.834 14C21.3861 14.0002 21.834 14.4478 21.834 15C21.834 15.5522 21.3861 15.9998 20.834 16H9.16699C8.61471 16 8.16699 15.5523 8.16699 15C8.16699 14.4477 8.61471 14 9.16699 14H20.834Z"
            fill="#323D54"
          />
        </svg>
      </button>

      <p>
        {quantity} box{quantity !== 1 ? "es" : ""}{" "}
      </p>
      <button
        type="button"
        className={styles.controlButton}
        onClick={incrementQuantity}
        aria-label="Increase quantity"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="30" height="30" rx="4" fill="white" />
          <path
            d="M15 8.16602C15.5523 8.16602 16 8.61373 16 9.16602V14H20.834C21.3861 14.0002 21.834 14.4478 21.834 15C21.834 15.5522 21.3861 15.9998 20.834 16H16V20.833C15.9998 21.3851 15.5522 21.833 15 21.833C14.448 21.8328 14.0002 21.385 14 20.833V16H9.16699C8.61471 16 8.16699 15.5523 8.16699 15C8.16699 14.4477 8.61471 14 9.16699 14H14V9.16602C14 8.61384 14.4479 8.16619 15 8.16602Z"
            fill="#323D54"
          />
        </svg>
      </button>
    </div>
  );
}
