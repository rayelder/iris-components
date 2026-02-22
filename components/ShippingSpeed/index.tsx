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
          <Radio label="5-7 business days" tag="FREE" value="5" checked />
          <Radio label="2-3 business days" tag="$14.99" value="2" />
          <Radio label="1 business day" tag="$19.99" value="1" />
        </RadioGroup>
      </div>
    </div>
  );
}
