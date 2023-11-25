"use client";

import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { useEffect } from "react";

import { RectButton } from "@/components/buttons/RectButton";
import { ErrorPlayer } from "@/components/lottie/Error";

import styles from "./global-error.module.scss";

export const metadata: Metadata = {
  title: "Error",
};

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
});

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={`${styles.container} ${notoSansJP.className}`}>
      <h1 className={styles.title}>エラー</h1>
      <div className={styles.animation}>
        <ErrorPlayer />
      </div>
      <div className={styles.description}>
        <span className={styles.secondary}>問題が発生しました</span>
        <span className={styles.primary}>時間をおいて再度お試しください</span>
        <div className={styles.button}>
          <RectButton color="blue" onClick={reset}>
            戻る
          </RectButton>
        </div>
      </div>
    </main>
  );
}
