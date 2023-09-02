"use client";

import styles from "./styles.module.scss";

type BorderdButtonProps = {
  text: string;
  size: string;
  outborderd: boolean;
  decide: () => void;
};

export function BorderdCircleButton({ text, size, outborderd, decide }: BorderdButtonProps) {
  const insize = Number(size) - Number(size) / 10;
  const textsize = Number(size) / 5;
  const outsize = Number(size) + (Number(size) / 5) * Number(outborderd);

  return (
    <button
      className={`${styles.main} ${styles.circle}`}
      style={{ width: `${outsize}px`, height: `${outsize}px` }}
      onClick={decide}
    >
      <div className={styles.main} style={{ width: `${size}px`, height: `${size}px` }}>
        <div className={styles.section} style={{ width: `${insize}px`, height: `${insize}px` }}>
          <div className={styles.text} style={{ fontSize: `${textsize}px` }}>
            {text}
          </div>
        </div>
      </div>
    </button>
  );
}
