"use cliant";

import styles from "./styles.module.scss";

type BorderTitleProps = {
  title: string;
  className?: string;
};

export function BorderTitle({ title, className }: BorderTitleProps) {
  return <span className={`${styles.title} ${className}`}>{title}</span>;
}
