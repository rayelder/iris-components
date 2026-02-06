import Link from "next/link";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <div className={styles.base}>
      <Link href="/">Iris Design System</Link>
    </div>
  );
}
