import { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";

export const metadata: Metadata = {
  title: "Terms of Service",
};

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header></header>
      <main className={`${notoSansJP.className}`}>{children}</main>
      <footer></footer>
    </>
  );
}
