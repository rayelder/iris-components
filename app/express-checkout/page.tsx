import Masthead from "@/components/Masthead";
import OrderSummary from "@/components/OrderSummary";
import Rx from "@/components/Rx";

import style from "./page.module.css";

export default function ExpressCheckout() {
  return (
    <div className={style.mobile}>
      <div className={style.desktop}>
        <Masthead />
        <div className={style.padded}>
          <h1>Express checkout</h1>
          <OrderSummary />
          <Rx />
        </div>
      </div>
    </div>
  );
}
