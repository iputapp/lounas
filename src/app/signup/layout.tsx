import { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";

import styles from "./layout.module.scss";

export const metadata: Metadata = {
  title: "Sign up",
  description: "This is the sign-up page. You can create an account from this page.",
};

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header></header>
      <main className={`${styles.main} ${notoSansJP.className}`}>
        <div className={styles.bg}></div>
        {children}
      </main>
      <footer></footer>
    </>
  );
}
