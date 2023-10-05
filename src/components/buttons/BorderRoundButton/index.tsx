"use client";

import styles from "./styles.module.scss";

type BorderRoundButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
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
};

export function BorderRoundButton({
  children,
  fontSize,
  type = "button",
  onClick,
}: BorderRoundButtonProps) {
  return (
    <button className={`${styles.container} ${fontSize}`} type={type} onClick={onClick}>
      <div className={styles.inner}>
        <span className={styles.title}>{children}</span>
      </div>
    </button>
  );
}
