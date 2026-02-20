"use client";

import { useState } from "react";

import styles from "./OrderSummary.module.css";

export default function OrderSummary() {
  var [isExpanded, setIsExpanded] = useState(false);

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
        {!isExpanded && <div className={styles.rightColumn}>$999.99</div>}
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
                <td>$970.01</td>
              </tr>
              <tr>
                <th>Shipping:</th>
                <td>$19.99</td>
              </tr>
              <tr>
                <th>Taxes:</th>
                <td>$9.99</td>
              </tr>
              <tr className={styles.total}>
                <th>Total:</th>
                <td>$999.99</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
