import styles from "./Button.module.css";

export default function Button({
  label = "Call-to-action",
  isPill = false,
}: {
  label: string;
  isPill?: boolean;
}) {
  return (
    <button className={isPill ? styles.pill : styles.rounded}>{label}</button>
  );
}
