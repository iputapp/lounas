import { Metadata } from "next";

import { CirclesTopLeft } from "@/components/backgrounds/CirclesTopLeft";

import styles from "./layout.module.scss";

export const metadata: Metadata = {
  title: "Home",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={styles.bg}></div>
      <CirclesTopLeft />
      {children}
    </>
  );
}
