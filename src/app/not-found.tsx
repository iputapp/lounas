import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import styles from "./not-found.module.scss";

export const metadata: Metadata = {
  title: "Not Found",
};

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
});

export default function NotFound() {
  return (
    <main className={`${styles.container} ${notoSansJP.className}`}>
      <h1 className={styles.title}>Not Found</h1>
      <div className={styles.balloon}>
        <span>お探しのページは見つかりませんでした...</span>
      </div>
      <div className={styles.penguin}>
        <Image
          src="/images/not-found-penguin.webp"
          alt="not-found-penguin"
          fill
          sizes="(max-width: 768px) 80vw, (max-width: 1200px) 80vw, 80vw"
          priority
        />
      </div>
      <Link href="/">ホームに戻る</Link>
    </main>
  );
}
