import React from "react";

import styles from "./layout.module.scss";

export const metadata = {
  title: "User",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={styles.bg}>
        <span className={`${styles.triangle} ${styles.blue}`}></span>
        <span className={`${styles.triangle} ${styles.cyan1}`}></span>
        <span className={`${styles.triangle} ${styles.green}`}></span>
        <span className={`${styles.triangle} ${styles.cyan2}`}></span>
      </div>
      {children}
    </>
  );
}
