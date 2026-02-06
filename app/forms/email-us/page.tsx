import Button from "@/components/Button";
import InputSecurityCode from "@/components/InputSecurityCode";
import InputText from "@/components/InputText";
import Nav from "@/components/Nav";

import styles from "../../page.module.css";
import Checkbox from "@/components/Checkbox";
import Select from "@/components/Select";
import Textarea from "@/components/Textarea";

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
