import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email us - Forms - Iris Design System",
};

import EmailUsForm from "@/components/forms/EmailUsForm";
import Nav from "@/components/Nav";

export default function EmailUs() {
  return (
    <>
      <Nav />
      <EmailUsForm />
    </>
  );
}
