"use client";

import { useState } from "react";

import Image from "next/image";

import Button from "../Button";
import QuantitySelector from "../QuantitySelector";
import PackSelector from "../PackSelector";

import styles from "./Rx.module.css";
import StandaloneLink from "../StandaloneLink";
import PackSelectors from "../PackSelectors";

export default function Rx({
  setBoxCountA,
  setBoxCountB,
  setPricePerBox,
}: {
  setBoxCountA: React.Dispatch<React.SetStateAction<number>>;
  setBoxCountB: React.Dispatch<React.SetStateAction<number>>;
  setPricePerBox: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [showDetails, setShowDetails] = useState(false);

  const [boxA, setBoxA] = useState(1);
  const [boxB, setBoxB] = useState(1);

  const handleContinue = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

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
          {/* <p>Right eye (OD)</p> */}
        </div>
        {/* <div className={styles.eye}>
          <Image
            src="/images/ProductImage.png"
            alt="Prescription details"
            width={96}
            height={96}
          />
          <p>Left eye (OS)</p>
        </div> */}
      </div>
      <div className={styles.toggleDetails}>
        <div className={styles.toggleDetailsCentered}>
          <StandaloneLink onClick={() => setShowDetails((prev) => !prev)}>
            View parameters
          </StandaloneLink>
        </div>

        {showDetails && (
          <table className={styles.details}>
            <thead>
              <tr>
                <th>Right eye (OD)</th>
                <th>Left eye (OS)</th>
              </tr>
            </thead>
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

      <PackSelectors setBoxPrice={setPricePerBox} />

      <p className={styles.heading}>Select quantity</p>
      <div className={styles.quantity}>
        <QuantitySelector
          quantity={boxA}
          onChange={(value) => {
            setBoxA(value);
            setBoxCountA(value);
          }}
        />
        <QuantitySelector
          quantity={boxB}
          onChange={(value) => {
            setBoxB(value);
            setBoxCountB(value);
          }}
        />
      </div>
      <Button label="Continue" isPrimary onClick={handleContinue} />
    </div>
  );
}
