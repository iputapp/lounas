"use cliant";

import styles from "./styles.module.scss";

type BorderedTitleProps = {
  title: string;
  className?: string;
};

export function BorderedTitle({ title, className }: BorderedTitleProps) {
  return <span className={`${styles.title} ${className}`}>{title}</span>;
}
