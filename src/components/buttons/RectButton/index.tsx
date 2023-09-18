"use client";

import styles from "./styles.module.scss";

type RectButtonProps = {
  children: React.ReactNode;
  color: "blue" | "red";
  onClick: () => void;
};

export function RectButton({ children, color, onClick }: RectButtonProps) {
  return (
    <button className={`${styles.box} ${styles[color]}`} onClick={onClick}>
      <span className={styles.text}>{children}</span>
    </button>
  );
}
