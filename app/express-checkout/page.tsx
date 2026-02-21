"use client";

import { useState } from "react";

import Masthead from "@/components/Masthead";
import OrderSummary from "@/components/OrderSummary";
import Rx from "@/components/Rx";

import style from "./page.module.css";

export default function ExpressCheckout() {
  const [boxCountA, setBoxCountA] = useState(1);
  const [boxCountB, setBoxCountB] = useState(1);
  const [pricePerBox, setPricePerBox] = useState(39.99);
  var boxCount = boxCountA + boxCountB;
  var subtotal = pricePerBox * boxCount;

  return (
    <div className={style.mobile}>
      <div className={style.desktop}>
        <Masthead />
        <div className={style.padded}>
          <h1>Express checkout</h1>
          <OrderSummary
            subtotal={subtotal}
            shipping={boxCount === 0 ? 0 : 19.99}
          />
          <Rx
            setBoxCountA={setBoxCountA}
            setBoxCountB={setBoxCountB}
            setPricePerBox={setPricePerBox}
          />
        </div>
      </div>
    </div>
  );
}
