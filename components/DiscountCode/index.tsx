import Button from "../Button";
import InputText from "../InputText";

import styles from "./DiscountCode.module.css";

export default function DiscountCode() {
  return (
    <div className={styles.base}>
      <InputText label="Discount code" value="" />
      <Button label="Apply" isPrimary isDisabled />
    </div>
  );
}
