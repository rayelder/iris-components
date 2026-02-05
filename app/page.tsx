import InputText from "@/components/InputText";

export default function Home() {
  return (
    <div>
      <h2>Add payment method</h2>
      <InputText label="Card holder name" value="" />
      <InputText label="Card number" value="" />
      <InputText label="Expiration date" value="" />
      <InputText label="Security code" value="" />
    </div>
  );
}
