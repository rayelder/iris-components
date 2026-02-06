import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add payment method - Forms - Iris Design System",
};

import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import InputSecurityCode from "@/components/InputSecurityCode";
import InputText from "@/components/InputText";
import Nav from "@/components/Nav";

import styles from "../../page.module.css";

export default function AddPaymentMethod() {
  return (
    <>
      <Nav />
      <form className={styles.form}>
        <h1>Add payment method</h1>
        <InputText label="Card holder name" value="" />
        <InputText label="Card number" value="" />
        <div className={styles.row}>
          <InputText label="Expiration date" value="" />
          <InputSecurityCode label="Security code" value="" />
        </div>
        <Checkbox label="Set as default payment method" />
        <Button label="Add payment method" />
      </form>
    </>
  );
}
