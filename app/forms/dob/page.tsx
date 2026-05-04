import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Date of birth - Forms - Iris Design System",
};

import Nav from "@/components/Nav";
import DateOfBirthForm from "@/components/forms/DateOfBirthForm";

import style from "../forms.module.css";

export default function DOB() {
  return (
    <>
      <Nav />
      <div className={style.form}>
        <DateOfBirthForm />
      </div>
    </>
  );
}
