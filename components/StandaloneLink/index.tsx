"use client";

import { useState } from "react";

import styles from "./StandaloneLink.module.css";

type StandaloneLinkProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLParagraphElement>) => void;
};

export default function StandaloneLink({
  children,
  onClick,
}: StandaloneLinkProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = (e: React.MouseEvent<HTMLParagraphElement>) => {
    setIsExpanded((previousState) => !previousState);
    onClick?.(e);
  };

  return (
    <p
      className={styles.base}
      onClick={toggleExpanded}
      role="button"
      tabIndex={0}
    >
      {children}
      {isExpanded ? (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.5 8.75L6 4.25L1.5 8.75"
            stroke="#6d7588"
            strokeWidth="1.5"
          />
        </svg>
      ) : (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.5 3.75L6 8.25L1.5 3.75"
            stroke="#6d7588"
            strokeWidth="1.5"
          />
        </svg>
      )}
    </p>
  );
}
