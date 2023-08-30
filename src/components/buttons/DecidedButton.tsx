"use client";

import Link from "next/link";

import styles from "./decidedbutton.module.scss";

type DecidedProps = {
  text: string;
  id: string;
  color: string;
};

export function BackButton({ text, id, color }: DecidedProps) {
  return (
    <div className={styles.box}>
      <div className={`${styles[color]}`}>
        <Link className={styles.text} type="button" href={`/${id}`}>
          {text}
        </Link>
      </div>
    </div>
  );
}
