import styles from "./Overlay.module.css";

export default function Overlay({ onClick }: { onClick?: () => void }) {
  return <div className={styles.base} onClick={onClick} />;
}
