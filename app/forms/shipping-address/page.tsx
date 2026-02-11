import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Address - Forms - Iris Design System",
};

import Nav from "@/components/Nav";
import ShippingAddressForm from "@/components/forms/shippingAddressForm";

// import styles from "../../page.module.css";

export default function ShippingAddress() {
  return (
    <>
      <Nav />
      <ShippingAddressForm />
    </>
  );
}
