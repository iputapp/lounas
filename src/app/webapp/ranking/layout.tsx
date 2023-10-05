import { Metadata } from "next";

import styles from "./layout.module.scss";

export const metadata: Metadata = {
  title: "Ranking",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={styles.bg}></div>
      {children}
    </>
  );
}
