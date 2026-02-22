import EditButton from "../EditButton";
import styles from "./InfoDisplay.module.css";

export default function InfoDisplay({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.base}>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={styles.input}>
        {children}
        <EditButton
          onClick={() => {
            alert("Edit functionality is not implemented in this demo.");
          }}
        />
      </div>
    </div>
  );
}
