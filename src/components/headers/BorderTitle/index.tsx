"use cliant";

import styles from "./styles.module.scss";

type BorderTitleProps = {
  title: string;
  className?: string;
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
  fontWeight?:
    | "font-thin"
    | "font-extralight"
    | "font-light"
    | "font-normal"
    | "font-medium"
    | "font-semibold"
    | "font-bold"
    | "font-extrabold"
    | "font-black";
  boderPadding?:
    | "py-0"
    | "py-1"
    | "py-2"
    | "py-3"
    | "py-4"
    | "py-5"
    | "py-6"
    | "py-7"
    | "py-8"
    | "py-9"
    | "py-10"
    | "py-11"
    | "py-12";
};

export function BorderTitle({
  title,
  className = "",
  fontSize = "text-4xl",
  fontWeight = "font-bold",
  boderPadding = "py-4",
}: BorderTitleProps) {
  return (
    <div className={`${className}`}>
      <span className={`${styles.title} ${boderPadding} ${fontSize} ${fontWeight}`}>{title}</span>
    </div>
  );
}
