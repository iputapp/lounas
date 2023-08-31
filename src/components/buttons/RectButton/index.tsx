"use client";

import styles from "./styles.module.scss";

type RectButtonProps = {
  text: string;
  color: "blue" | "red";
  onClick: () => void;
};

export function RectButton({ text, color, onClick }: RectButtonProps) {
  return (
    <button className={`${styles.box} ${styles[color]} ${styles.flexCenterAll}`} onClick={onClick}>
      <span className={styles.text}>{text}</span>
    </button>
  );
}
