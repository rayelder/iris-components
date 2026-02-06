import Button from "@/components/Button";
import InputSecurityCode from "@/components/InputSecurityCode";
import InputText from "@/components/InputText";

import styles from "./page.module.css";
import Checkbox from "@/components/Checkbox";

export default function Home() {
  return (
    <>
      <form className={styles.form}>
        <h2>Add payment method</h2>
        <InputText label="Card number" value="" disabled />
        <InputText label="Card holder name" value="" />
        <InputText label="Card number" value="" />
        <div className={styles.row}>
          <InputText label="Expiration date" value="" />
          <InputSecurityCode label="Security code" value="" />
        </div>
        <div className={styles.row}>
          <InputText label="Expiration date" value="" />
          <InputSecurityCode label="Security code" value="" />
        </div>
        <Checkbox label="Set as default payment method" />
        <Checkbox label="Set as default payment method" />
        <Button label="Add payment method" />
      </form>
    </>
  );
}
