import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add payment method - Forms - Iris Design System",
};

import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import InputSecurityCode from "@/components/InputSecurityCode";
import InputText from "@/components/InputText";
import Nav from "@/components/Nav";

import styles from "../../page.module.css";
import AddPaymentForm from "@/components/forms/AddPaymentForm";

export default function AddPaymentMethod() {
  return (
    <>
      <Nav />
      <AddPaymentForm />
    </>
  );
}
