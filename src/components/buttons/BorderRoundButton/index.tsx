"use client";

import styles from "./styles.module.scss";

type BorderRoundButtonProps = {
  title: string;
  fontSize?:
    | "text-xs"
    | "text-sm"
    | "text-base"
    | "text-lg"
    | "text-xl"
    | "text-2xl"
    | "text-3xl"
    | "text-4xl"
    | "text-5xl"
    | "text-6xl"
    | "text-7xl"
    | "text-8xl"
    | "text-9xl";
  onClick: () => void;
};

export function BorderRoundButton({ title, fontSize, onClick }: BorderRoundButtonProps) {
  return (
    <button className={`${styles.container} ${fontSize}`} onClick={onClick}>
      <div className={styles.inner}>
        <span className={styles.title}>{title}</span>
      </div>
    </button>
  );
}
