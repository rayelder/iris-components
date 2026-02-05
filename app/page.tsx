import Button from "@/components/Button";
import InputText from "@/components/InputText";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.form}>
      <h2>Add payment method</h2>
      <InputText label="Card holder name" value="" />
      <InputText label="Card number" value="" />
      <div className={styles.row}>
        <InputText label="Expiration date" value="" />
        <InputText label="Security code" value="" />
      </div>
      <Button label="Add payment method" />
    </div>
  );
}
