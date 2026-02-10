import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add payment method - Forms - Iris Design System",
};

import AddPaymentForm from "@/components/forms/AddPaymentForm";
import Nav from "@/components/Nav";

export default function AddPaymentMethod() {
  return (
    <>
      <Nav />
      <AddPaymentForm />
    </>
  );
}
