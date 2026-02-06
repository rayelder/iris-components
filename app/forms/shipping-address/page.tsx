import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Nav from "@/components/Nav";

import styles from "../../page.module.css";
import Checkbox from "@/components/Checkbox";
import Select from "@/components/Select";

export default function Home() {
  return (
    <>
      <Nav />
      <form className={styles.form}>
        <h1>Edit shipping address</h1>
        <div className={styles.row}>
          <InputText label="First name" value="" />
          <InputText label="Last name" value="" />
        </div>
        <InputText label="Street address" value="" />
        <InputText label="City" value="" />
        <div className={styles.row}>
          <Select
            label="State"
            value=""
            options={[
              { value: "ut", label: "Utah" },
              { value: "ca", label: "California" },
            ]}
          />
          <InputText label="Zip code" value="" />
        </div>
        <Select
          label="Country"
          value=""
          options={[
            { value: "us", label: "United States" },
            { value: "ca", label: "Canada" },
          ]}
        />
        <Checkbox label="Set as default shipping address" />
        <Button label="Save shipping address" />
      </form>
    </>
  );
}
