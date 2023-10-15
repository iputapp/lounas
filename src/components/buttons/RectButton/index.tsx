"use client";

import styles from "./styles.module.scss";

type RectButtonProps = {
  children: React.ReactNode;
  color: "blue" | "red";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  value?: React.ButtonHTMLAttributes<HTMLButtonElement>["value"];
};

export function RectButton({ children, color, onClick, value }: RectButtonProps) {
  return (
    <button className={`${styles.box} ${styles[color]}`} onClick={onClick} value={value}>
      <span className={styles.text}>{children}</span>
    </button>
  );
}
