"use client";

import { FormEvent } from "react";

import Button from "@/components/Button";
import InputText from "@/components/InputText";

import styles from "@/app/page.module.css";

export default function AddPaymentForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("--> Form submitted");
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Add payment method</h1>
      <InputText label="Card holder name" value="" validationSchema="ccName" />
      <InputText label="Card number" value="" validationSchema="ccNumber" />
      <Button label="Add payment method" />
    </form>
  );
}
