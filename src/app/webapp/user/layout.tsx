import { Metadata } from "next";

import styles from "./layout.module.scss";

export const metadata: Metadata = {
  title: "User",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={styles.bg}>
        <span className={`${styles.triangle} ${styles.blue}`}></span>
        <span className={`${styles.triangle} ${styles.cyan}`}></span>
        <span className={`${styles.triangle} ${styles.green}`}></span>
        <span className={`${styles.triangle} ${styles.lime}`}></span>
      </div>
      {children}
    </>
  );
}
