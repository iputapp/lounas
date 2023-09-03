"use client";

import styles from "./styles.module.scss";

type BorderdCircleButtonProps = {
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
  outline?: boolean;
  onClick: () => void;
};

export function BorderdCircleButton({
  title,
  fontSize,
  outline = false,
  onClick,
}: BorderdCircleButtonProps) {
  return (
    <div className={outline ? styles.circleOuter : ""}>
      <button className={`${styles.circle} ${fontSize}`} onClick={onClick}>
        <div className={styles.circleInner}>
          <span className={styles.title}>{title}</span>
        </div>
      </button>
    </div>
  );
}