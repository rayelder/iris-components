import styles from "./Button.module.css";

export default function Button({
  label = "Call-to-action",
  isPill = true,
}: {
  label: string;
  isPill?: boolean;
}) {
  return (
    <button className={isPill ? styles.pill : styles.rounded} type="submit">
      {label}
    </button>
  );
}
