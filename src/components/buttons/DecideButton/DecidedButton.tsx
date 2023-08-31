"use client";

import styles from "./DecideButton.module.scss";

type DecidedProps = {
  text: string;
  color: string;
  decided: () => void;
};

export function BackButton({ text, color, decided }: DecidedProps) {
  return (
    <button className={styles.box} onClick={decided}>
      <div className={`${styles[color]} ${styles.flexCenter}`}>
        <div className={styles.text}>{text}</div>
      </div>
    </button>
  );
}
