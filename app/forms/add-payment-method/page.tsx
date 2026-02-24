import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add payment method - Forms - Iris Design System",
};

import style from "../forms.module.css";

import AddPaymentForm from "@/components/forms/AddPaymentForm";
import Nav from "@/components/Nav";

export default function AddPaymentMethod() {
  return (
    <>
      <Nav />
      <div className={style.form}>
        <AddPaymentForm />
      </div>
    </>
  );
}
