"use client";

import { useState, useEffect } from "react";

import styles from "./OrderSummary.module.css";

type OrderSummaryProps = {
  subtotal: number;
  shipping: number;
  onTotalChange?: (total: number) => void;
};

export default function OrderSummary({
  subtotal = 0,
  shipping = 0,
  onTotalChange,
}: OrderSummaryProps) {
  var [isExpanded, setIsExpanded] = useState(false);

  const taxRate = 0.087;
  const taxes = subtotal * taxRate;
  const total = subtotal + shipping + taxes;

  useEffect(() => {
    onTotalChange?.(total);
  }, [total, onTotalChange]);

  function handleTap() {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className={styles.base}>
      <div
        className={!isExpanded ? styles.header : styles.headerExpanded}
        onClick={handleTap}
        aria-expanded={isExpanded}
      >
        <div className={styles.leftColumn}>
          <span>Order Summary</span>
          {isExpanded ? (
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5 8.75L6 4.25L1.5 8.75"
                stroke="#323d54"
                strokeWidth="2"
              />
            </svg>
          ) : (
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5 3.75L6 8.25L1.5 3.75"
                stroke="#323d54"
                strokeWidth="2"
              />
            </svg>
          )}
        </div>
        {!isExpanded && (
          <div className={styles.rightColumn}>${total.toFixed(2)}</div>
        )}
      </div>

      <div
        className={`${styles.orderSummary} ${
          isExpanded ? styles.expanded : styles.collapsed
        }`}
      >
        <div className={styles.orderSummaryInner}>
          <table className={styles.summary}>
            <tbody>
              <tr>
                <th>Subtotal:</th>
                <td>${subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <th>Shipping:</th>
                <td>${shipping.toFixed(2)}</td>
              </tr>
              <tr>
                <th>Taxes:</th>
                <td>${taxes.toFixed(2)}</td>
              </tr>
              <tr className={styles.total}>
                <th>Total:</th>
                <td>${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
