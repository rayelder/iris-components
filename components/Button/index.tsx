import styles from "./Button.module.css";

export default function Button({
  label = "Call-to-action",
  isPill = true,
  isPrimary = false,
}: {
  label: string;
  isPill?: boolean;
  isPrimary?: boolean;
}) {
  return (
    <button
      className={`${isPill ? styles.pill : styles.rounded} ${isPrimary ? styles.primary : styles.secondary}`}
      type="submit"
      tabIndex={0}
    >
      {label}
    </button>
  );
}
