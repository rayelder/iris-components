import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in - Forms - Iris Design System",
};

import Nav from "@/components/Nav";
import LoginForm from "@/components/forms/LoginForm";

export default function Login() {
  return (
    <>
      <Nav />
      <LoginForm />
    </>
  );
}
