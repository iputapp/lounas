"use client";

import styles from "./styles.module.scss";

type RectButtonProps = {
  children: React.ReactNode;
  color: "blue" | "red";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  value?: React.ButtonHTMLAttributes<HTMLButtonElement>["value"];
  autoFocus?: boolean;
};

export function RectButton({ children, color, onClick, value, autoFocus }: RectButtonProps) {
  return (
    <button
      className={`${styles.box} ${styles[color]}`}
      onClick={onClick}
      value={value}
      autoFocus={autoFocus}
    >
      <span className={styles.text}>{children}</span>
    </button>
  );
}
