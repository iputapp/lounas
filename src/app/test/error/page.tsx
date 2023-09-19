"use client";

import { Metadata } from "next";
import { useEffect } from "react";

import { RectButton } from "@/components/buttons/RectButton";
import { ErrorPlayer } from "@/components/lottie/Error";

import styles from "./error.module.scss";

export const metadata: Metadata = {
  title: "Error",
};

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>エラー</h1>
      <div className={styles.animation}>
        <ErrorPlayer />
      </div>
      <div className={styles.description}>
        <span className={styles.secondary}>認証コードの確認で問題が発生しました</span>
        <span className={styles.primary}>時間をおいて再度お試しください</span>
        <div className={styles.button}>
          <RectButton color="blue" onClick={reset}>
            戻る
          </RectButton>
        </div>
      </div>
    </div>
  );
}
