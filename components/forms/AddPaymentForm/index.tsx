"use client";

import { FormEvent } from "react";
import { useState } from "react";

import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import InputText from "@/components/InputText";

import styles from "@/app/page.module.css";

export default function AddPaymentForm() {
  const [validateAll, setValidateAll] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidateAll(true);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Add payment method</h1>
      <InputText
        label="Card holder name"
        value=""
        validationSchema="ccName"
        shouldValidate={validateAll}
      />
      <InputText
        type="ccNumber"
        label="Card number"
        value=""
        validationSchema="ccNumber"
        shouldValidate={validateAll}
      />
      <div className={styles.row}>
        <InputText
          type="ccExpiration"
          label="Expiration (MM/YY)"
          value=""
          validationSchema="expiration"
          shouldValidate={validateAll}
        />
        <InputText
          label="Security code"
          value=""
          validationSchema="securityCode"
          showTrailingIcon
          shouldValidate={validateAll}
        />
      </div>
      <Checkbox label="Set as default payment method" />
      <div className={styles.buttonGroup}>
        <Button label="Add payment method" isPrimary />
      </div>
    </form>
  );
}
