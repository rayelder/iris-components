"use client";

import { FormEvent } from "react";
import { useState } from "react";

import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import InputText from "@/components/InputText";

import styles from "@/app/page.module.css";

export default function EyeCareProviderSearchForm() {
  const [validateAll, setValidateAll] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidateAll(true);
  };
  return (
    <form onSubmit={handleSubmit}>
      <InputText label="Eye care provider name" value="" />
      <div className={styles.buttonGroup}>
        <Button label="Add eye care provider" isPrimary isFullWidth />
      </div>
    </form>
  );
}
