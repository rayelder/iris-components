"use client";
import { useState, useEffect } from "react";

import PackSelector from "@/components/PackSelector";

import styles from "./PackSelectors.module.css";

type PackSize = {
  id: string;
  quantityPerPack: number;
  monthSupplyDuration: number;
  retailPrice: number;
  discountedPrice: number;
};

export default function PackSelectors({
  setBoxPrice,
}: {
  setBoxPrice: React.Dispatch<React.SetStateAction<number>>;
}) {
  const packSizes: PackSize[] = [
    {
      id: "pack-30",
      quantityPerPack: 30,
      monthSupplyDuration: 1,
      retailPrice: 49.99,
      discountedPrice: 39.99,
    },
    {
      id: "pack-90",
      quantityPerPack: 90,
      monthSupplyDuration: 3,
      retailPrice: 134.99,
      discountedPrice: 109.99,
    },
  ];
  const [pricePerBox, setPricePerBox] = useState(56.99);
  const [selectedPackId, setSelectedPackId] = useState(packSizes[0].id);

  const selectedPack = packSizes.find((p) => p.id === selectedPackId)!;

  useEffect(() => {
    setBoxPrice(selectedPack.discountedPrice);
  }, []);

  return (
    <div>
      <p className={styles.heading}>Select pack size</p>
      <div className={styles.base}>
        {packSizes.map((pack) => (
          <PackSelector
            key={pack.id}
            quantity={pack.quantityPerPack}
            supply={pack.monthSupplyDuration}
            retailPrice={pack.retailPrice}
            discountedPrice={pack.discountedPrice}
            isSelected={pack.id === selectedPackId}
            onSelect={() => {
              setSelectedPackId(pack.id);
              setBoxPrice(pack.discountedPrice);
            }}
          />
        ))}
      </div>
    </div>
  );
}
