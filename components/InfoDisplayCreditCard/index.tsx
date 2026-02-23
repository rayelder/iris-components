import EditButton from "../EditButton";
import styles from "./InfoDisplay.module.css";

export default function InfoDisplay({
  heading,
  children,
  onEditClick,
}: {
  heading: string;
  children: React.ReactNode;
  onEditClick?: () => void;
}) {
  return (
    <div className={styles.base}>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={styles.input}>
        {children}
        <EditButton onClick={onEditClick} />
      </div>
    </div>
  );
}
