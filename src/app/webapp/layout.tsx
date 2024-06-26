import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";

import { BottomNavigationBar } from "@/components/navigations/BottomNavigationBar";

import styles from "./layout.module.scss";

export const metadata: Metadata = {
  title: {
    default: "App",
    template: "%s - App | lounas",
  },
};

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header></header>
      <main className={`${styles.main} ${notoSansJP.className}`}>{children}</main>
      <footer>
        <BottomNavigationBar />
      </footer>
    </>
  );
}
