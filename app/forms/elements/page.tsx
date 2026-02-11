import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All form elements - Forms - Iris Design System",
};

import Checkbox from "@/components/Checkbox";
import InputText from "@/components/InputText";
import Nav from "@/components/Nav";
import Radio from "@/components/Radio";
import RadioGroup from "@/components/RadioGroup";
import Select from "@/components/Select";
import Textarea from "@/components/Textarea";

import styles from "../../page.module.css";

export default function FormElements() {
  return (
    <>
      <Nav />
      <form className={styles.form}>
        <h1>Form elements</h1>
        <h3>Checkbox</h3>
        <Checkbox label="Label" />
        <h3>InputText</h3>
        <InputText label="Label" value="" />
        <h3>InputText with trailing icon</h3>
        <InputText label="Label" value="" showTrailingIcon />
        <h3>RadioGroup - Vertical</h3>
        <RadioGroup label="Label" name="radio-group-v" direction="vertical">
          <Radio label="Option label 1" value="option1" />
          <Radio label="Option label 2" value="option2" />
          <Radio label="Option label 3" value="option3" />
        </RadioGroup>
        <h3>RadioGroup - Horizontal</h3>
        <RadioGroup label="Label" name="radio-group-h" direction="horizontal">
          <Radio label="Option label 1" value="option4" />
          <Radio label="Option label 2" value="option5" />
        </RadioGroup>
        <h3>Select</h3>
        <Select
          label="Label"
          value=""
          options={[
            { value: "option1", label: "Option one" },
            { value: "option2", label: "Option two" },
            { value: "option3", label: "Option three" },
          ]}
        />
        <h3>Textarea</h3>
        <Textarea label="Label" value="" rows={5} />
      </form>
    </>
  );
}
