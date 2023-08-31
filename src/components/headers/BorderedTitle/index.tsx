"use cliant";

import styles from "./styles.module.scss";

type BorderedTitleProps = {
  text: string;
  className?: string;
};

export function BorderedTitle({ text, className }: BorderedTitleProps) {
  return <h1 className={`${styles.title} ${className}`}>{text}</h1>;
}
