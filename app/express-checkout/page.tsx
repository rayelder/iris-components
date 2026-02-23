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
import Overlay from "@/components/Overlay";
import ShippingAddressForm from "@/components/forms/shippingAddressForm";

export default function ExpressCheckout() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);

  const [boxCountA, setBoxCountA] = useState(1);
  const [boxCountB, setBoxCountB] = useState(1);
  const [pricePerBox, setPricePerBox] = useState(39.99);
  var boxCount = boxCountA + boxCountB;
  var subtotal = pricePerBox * boxCount;

  return (
    <div className={style.mobile}>
      <div className={style.desktop}>
        {showOverlay && (
          <div className={style.form}>
            <ShippingAddressForm />
          </div>
        )}
        {showOverlay && <Overlay onClick={() => setShowOverlay(false)} />}
        <Masthead />
        <div className={style.padded}>
          <h1>Express checkout</h1>
          <OrderSummary
            subtotal={subtotal}
            shipping={boxCount === 0 ? 0 : 19.99}
            onTotalChange={setOrderTotal}
          />
          <Rx
            setBoxCountA={setBoxCountA}
            setBoxCountB={setBoxCountB}
            setPricePerBox={setPricePerBox}
          />
        </div>
        <div className={style.paddedWhite}>
          <InfoDisplay
            heading="Eye care provider"
            onEditClick={() => setShowOverlay(true)}
          >
            South Valley Optical
          </InfoDisplay>
          <InfoDisplayAddress
            heading="Shipping address"
            onEditClick={() => setShowOverlay(true)}
          >
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
          <InfoDisplayAddress
            heading="Payment method"
            onEditClick={() => setShowOverlay(true)}
          >
            <div>
              <p>Visa</p>
              <p>•••• •••• •••• 1118</p>
              <p>Expired 12/2026</p>
            </div>
          </InfoDisplayAddress>
          <DiscountCode />
          <Button
            label={`Pay $${orderTotal.toFixed(2)}`}
            isPrimary
            isFullWidth
            isDisabled={boxCount === 0}
          />
        </div>
      </div>
    </div>
  );
}
