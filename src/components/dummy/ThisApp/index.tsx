"use client";
import LogoFill from "@icons/logo-fill.svg";

import styles from "./styles.module.scss";

export function Thisapp({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <LogoFill />
        </div>
        <div className={styles.title}>IMΛP</div>
      </div>
      <div className={styles.main}>
        <div className={styles.about}>このアプリについて</div>
        <div className={styles.box}>{children}</div>
      </div>
      <div className={styles.footer}>
        <div className={styles.developer}>PROJECT RIPLUP アプリ開発サークル</div>
      </div>
    </div>
  );
}
