"use client";

import { FormEvent } from "react";
import { useState } from "react";

import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Warning from "@/components/Warning";

import styles from "@/app/page.module.css";

export default function LoginForm() {
  const [showWarning, setShowWarning] = useState(false);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowWarning(true);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Log in</h1>
      {showWarning && (
        <Warning
          message="We could not find your email address."
          handleDismiss={setShowWarning}
        />
      )}
      <InputText
        label="Email address"
        value="relder@1800contacts.com"
        validationSchema="email"
      />
      <div className={styles.buttonGroup}>
        <Button label="Log in" isPrimary />
        <Button label="Create an account" />
      </div>
    </form>
  );
}
