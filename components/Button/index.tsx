import styles from "./Button.module.css";

type ButtonProps = {
  label: string;
  isPill?: boolean;
  isPrimary?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
};

export default function Button({
  label = "Call-to-action",
  isPill = true,
  isPrimary = false,
  isDisabled = false,
  onClick = () => {},
}: ButtonProps) {
  return (
    <button
      className={`${isPill ? styles.pill : styles.rounded} ${isPrimary ? styles.primary : styles.secondary}`}
      type="submit"
      onClick={onClick}
      tabIndex={0}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
}
