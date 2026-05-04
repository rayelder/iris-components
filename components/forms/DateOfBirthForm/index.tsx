"use client";

import { FormEvent } from "react";
import { useState } from "react";

import Button from "@/components/Button";
import InputDate from "@/components/InputDate";

import styles from "@/app/page.module.css";

export default function DateOfBirthForm() {
  const [validateAll, setValidateAll] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidateAll(true);
  };
  return (
    <form onSubmit={handleSubmit}>
      <InputDate label="Date of birth" value="" shouldValidate={validateAll} />
      <div className={styles.buttonGroup}>
        <Button label="Continue" isPrimary isFullWidth />
      </div>
    </form>
  );
}
