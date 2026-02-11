"use client";

import { FormEvent } from "react";
import { useState } from "react";

import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import InputText from "@/components/InputText";
import Select from "@/components/Select";

import styles from "@/app/page.module.css";

export default function ShippingAddressForm() {
  const [validateAll, setValidateAll] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidateAll(true);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Edit shipping address</h1>
      <div className={styles.row}>
        <InputText
          label="First name"
          value=""
          validationSchema="firstName"
          shouldValidate={validateAll}
        />
        <InputText
          label="Last name"
          value=""
          validationSchema="lastName"
          shouldValidate={validateAll}
        />
      </div>
      <InputText
        label="Street address"
        value=""
        validationSchema="streetAddress"
        shouldValidate={validateAll}
      />
      <InputText
        label="City"
        value=""
        validationSchema="city"
        shouldValidate={validateAll}
      />
      <div className={styles.row}>
        <Select
          label="State"
          value=""
          options={[
            { value: "ut", label: "UT" },
            { value: "ca", label: "CA" },
          ]}
          validationSchema="state"
          shouldValidate={validateAll}
        />
        <InputText
          label="Zip code"
          value=""
          validationSchema="zipCode"
          shouldValidate={validateAll}
        />
      </div>
      <Select
        label="Country"
        value=""
        options={[
          { value: "us", label: "United States" },
          { value: "ca", label: "Canada" },
        ]}
        validationSchema="country"
        shouldValidate={validateAll}
      />
      <Checkbox
        label="Set as default shipping address"
        validationSchema="shippingAddress"
        shouldValidate={validateAll}
      />
      <Button label="Save shipping address" />
    </form>
  );
}
