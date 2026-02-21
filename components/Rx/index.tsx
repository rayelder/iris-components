"use client";

import { useState } from "react";

import Image from "next/image";

import Button from "../Button";
import QuantitySelector from "../QuantitySelector";
import PackSelector from "../PackSelector";

import styles from "./Rx.module.css";
import StandaloneLink from "../StandaloneLink";

export default function Rx() {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className={styles.base}>
      <p className={styles.title}>Nick's prescription</p>
      <p className={styles.subtitle}>Last ordered on Feb 20, 2025</p>
      <div className={styles.eyes}>
        <div className={styles.eye}>
          <Image
            src="/images/ProductImage.png"
            alt="Prescription details"
            width={96}
            height={96}
          />
          <p>Right eye (OD)</p>
        </div>
        <div className={styles.eye}>
          <Image
            src="/images/ProductImage.png"
            alt="Prescription details"
            width={96}
            height={96}
          />
          <p>Left eye (OS)</p>
        </div>
      </div>
      <div className={styles.toggleDetails}>
        <div className={styles.toggleDetailsCentered}>
          <StandaloneLink onClick={() => setShowDetails((prev) => !prev)}>
            View parameters
          </StandaloneLink>
        </div>

        {showDetails && (
          <table className={styles.details}>
            <tbody>
              <tr>
                <th>Power/sphere</th>
                <th>Power/sphere</th>
              </tr>
              <tr>
                <td>-1.00</td>
                <td>-2.00</td>
              </tr>
              <tr>
                <th>Base curve</th>
                <th>Base curve</th>
              </tr>
              <tr>
                <td>8.5</td>
                <td>8.5</td>
              </tr>
              <tr>
                <th>Diameter</th>
                <th>Diameter</th>
              </tr>
              <tr>
                <td>14.1</td>
                <td>14.1</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <p className={styles.heading}>Select pack size</p>
      <div className={styles.quantity}>
        <PackSelector />
        <PackSelector
          quantity={24}
          supply={12}
          retailPrice={99.99}
          discountedPrice={79.99}
        />
      </div>
      <p className={styles.heading}>Select quantity</p>
      <div className={styles.quantity}>
        <QuantitySelector />
        <QuantitySelector />
      </div>
      <Button label="Continue" isPrimary />
    </div>
  );
}
