"use client";

import styles from "./Radio.module.css";

interface RadioProps {
  label: string;
  tag: string;
  name?: string;
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export default function Radio({
  label,
  tag,
  name,
  value,
  checked = false,
  onChange,
  disabled = false,
}: RadioProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(value);
  };

  return (
    <label className={`${styles.base} ${disabled ? styles.disabled : ""}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className={styles.input}
      />
      <span className={styles.radio}></span>
      <span className={styles.label}>{label}</span>
      <span
        className={`${styles.label} ${styles.right} ${tag === "FREE" ? styles.free : ""}`}
      >
        {tag}
      </span>
    </label>
  );
}
