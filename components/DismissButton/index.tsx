import styles from "./DismissButton.module.css";

export default function DismissButton({
  handleDismiss,
}: {
  handleDismiss: (value: boolean) => void;
}) {
  return (
    <svg
      className={styles.base}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => handleDismiss(false)}
    >
      <path d="M3 3L13 13" stroke="#D9230C" strokeWidth="1.5" />
      <path d="M13 3L3 13" stroke="#D9230C" strokeWidth="1.5" />
    </svg>
  );
}
