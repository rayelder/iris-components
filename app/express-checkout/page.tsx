"use client";

import { useState } from "react";

import Masthead from "@/components/Masthead";
import OrderSummary from "@/components/OrderSummary";
import Rx from "@/components/Rx";

import style from "./page.module.css";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import DiscountCode from "@/components/DiscountCode";
import InfoDisplay from "@/components/InfoDisplay";
import InfoDisplayAddress from "@/components/InfoDisplayAddress";
import ShippingSpeed from "@/components/ShippingSpeed";

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
        <div className={style.paddedWhite}>
          <InfoDisplay heading="Eye care provider">
            South Valley Optical
          </InfoDisplay>
          <InfoDisplayAddress heading="Shipping address">
            <p>
              Edward Nygma
              <br />
              261 W Data Dr
              <br />
              Draper, UT
              <br />
              84101
            </p>
          </InfoDisplayAddress>
          <ShippingSpeed heading="Shipping speed">
            <p>Standard</p>
          </ShippingSpeed>
          <InfoDisplayAddress heading="Payment method">
            <div>
              <p>Visa</p>
              <p>5111 1111 1111 1118</p>
              <p>Expired 12/2026</p>
            </div>
          </InfoDisplayAddress>
          <DiscountCode />
          <Button label={`Pay $${subtotal.toFixed(2)}`} isPrimary />
        </div>
      </div>
    </div>
  );
}
