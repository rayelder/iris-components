import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iris Design System",
};

import Link from "next/link";
import Nav from "@/components/Nav";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Nav />
      <div className={styles.page}>
        <h1>Forms</h1>
        <ul>
          <li>
            <Link href="/forms/add-payment-method">Add payment method</Link>
          </li>
          <li>
            <Link href="/forms/email-us">Email us</Link>
          </li>
          <li>
            <Link href="/forms/login">Log in</Link>
          </li>
          <li>
            <Link href="/forms/shipping-address">Shipping address</Link>
          </li>
        </ul>
      </div>
      <div className={styles.page}>
        <h1>Components</h1>
        <ul>
          <li>
            <Link href="/forms/elements">Form elements</Link>
          </li>
          {/* <li>
            <Link href="/components/info-display">InfoDisplay</Link>
          </li> */}
        </ul>
      </div>
    </>
  );
}
