"use client";

import {
  ReactNode,
  Children,
  cloneElement,
  isValidElement,
  useState,
  ReactElement,
} from "react";
import styles from "./RadioGroup.module.css";

interface RadioGroupProps {
  label?: string;
  name: string;
  children: ReactNode;
  direction?: "vertical" | "horizontal";
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export default function RadioGroup({
  label,
  name,
  children,
  direction = "vertical",
  defaultValue = "",
  onChange,
}: RadioGroupProps) {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (value: string) => {
    setSelectedValue(value);
    onChange?.(value);
  };

  return (
    <div className={styles.base}>
      {label && <div className={styles.label}>{label}</div>}
      <div
        className={`${styles.group} ${
          direction === "horizontal" ? styles.horizontal : styles.vertical
        }`}
        role="radiogroup"
        aria-label={label}
      >
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement(child as ReactElement<any>, {
              name: name,
              checked: (child.props as any).value === selectedValue,
              onChange: handleChange,
            });
          }
          return child;
        })}
      </div>
    </div>
  );
}
