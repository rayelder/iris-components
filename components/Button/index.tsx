import styles from "./Button.module.css";

export default function Button({
  label = "Call-to-action",
}: {
  label: string;
}) {
  return <button className={styles.base}>{label}</button>;
}
