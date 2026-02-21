import Radio from "@/components/Radio";
import RadioGroup from "@/components/RadioGroup";
import styles from "./ShippingSpeed.module.css";

export default function ShippingSpeed({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.base}>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={styles.input}>
        <RadioGroup label="" name="radio-group-v" direction="vertical">
          <Radio label="5-7 business days" value="5" />
          <Radio label="2-3 business days" value="2" />
          <Radio label="1 business day" value="1" />
        </RadioGroup>
      </div>
    </div>
  );
}
