import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email us - Forms - Iris Design System",
};

import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Nav from "@/components/Nav";
import Select from "@/components/Select";
import Textarea from "@/components/Textarea";

import styles from "../../page.module.css";

export default function EmailUs() {
  return (
    <>
      <Nav />
      <form className={styles.form}>
        <h1>Email us</h1>
        <InputText label="Name" value="" />
        <Select
          label="Reason for contact"
          value=""
          options={[
            { value: "support", label: "Support" },
            { value: "sales", label: "Sales" },
            { value: "feedback", label: "Feedback" },
          ]}
        />
        <InputText label="Email" value="" />
        <Textarea label="Message" value="" rows={5} />
        <Button label="Send email" />
      </form>
    </>
  );
}
