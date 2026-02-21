"use client";

import { useState } from "react";

import styles from "./PackSelector.module.css";

type QuantitySelectorProps = {
  quantity?: number;
  supply?: number;
  retailPrice?: number;
  discountedPrice?: number;
};

export default function PackSelector({
  quantity = 12,
  supply = 6,
  retailPrice = 94.99,
  discountedPrice = 75.99,
}: QuantitySelectorProps) {
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelected = () => {
    setIsSelected((previousSelected) => !previousSelected);
  };
  return (
    <div
      className={isSelected ? styles.selected : styles.base}
      onClick={toggleSelected}
    >
      <div>
        <p className={styles.pack}>{quantity} pack</p>
        <p className={styles.prices}>
          <span className={styles.discountedPrice}>${discountedPrice}</span>
          {/* <span className={styles.retailPrice}>${retailPrice}</span> */}
        </p>
        <p className={styles.supplyLength}>{supply}-month supply</p>
      </div>
    </div>
  );
}
