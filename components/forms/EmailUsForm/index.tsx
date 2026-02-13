"use client";

import { FormEvent } from "react";
import { useState } from "react";

import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Select from "@/components/Select";
import Textarea from "@/components/Textarea";

import styles from "@/app/page.module.css";

export default function EmailUsForm() {
  const [validateAll, setValidateAll] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidateAll(true);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Email us</h1>
      <InputText
        label="Name"
        value=""
        validationSchema="name"
        shouldValidate={validateAll}
      />
      <Select
        label="Reason for contact"
        value=""
        options={[
          { value: "support", label: "Support" },
          { value: "sales", label: "Sales" },
          { value: "feedback", label: "Feedback" },
        ]}
        validationSchema="reasonForContact"
        shouldValidate={validateAll}
      />
      <InputText
        label="Email"
        value=""
        validationSchema="email"
        shouldValidate={validateAll}
      />
      <Textarea
        label="Message"
        value=""
        rows={5}
        validationSchema="message"
        shouldValidate={validateAll}
      />
      <div className={styles.buttonGroup}>
        <Button label="Send email" />
      </div>
    </form>
  );
}
