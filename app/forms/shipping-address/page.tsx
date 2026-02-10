import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Address - Forms - Iris Design System",
};

import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import InputText from "@/components/InputText";
import Nav from "@/components/Nav";
import Select from "@/components/Select";

import styles from "../../page.module.css";

export default function ShippingAddress() {
  return (
    <>
      <Nav />
      <form className={styles.form}>
        <h1>Edit shipping address</h1>
        <div className={styles.row}>
          <InputText label="First name" value="" />
          <InputText label="Last name" value="" />
        </div>
        <InputText label="Street address" value="" />
        <div className={styles.row}>
          <InputText label="City" value="" />
          <Select
            label="State"
            value=""
            options={[
              { value: "ut", label: "Utah" },
              { value: "ca", label: "California" },
            ]}
          />
          <InputText label="Zip code" value="" />
        </div>
        <Select
          label="Country"
          value=""
          options={[
            { value: "us", label: "United States" },
            { value: "ca", label: "Canada" },
          ]}
        />
        <Checkbox label="Set as default shipping address" />
        <Button label="Save shipping address" />
      </form>
    </>
  );
}
