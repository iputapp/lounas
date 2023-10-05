"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { RectButton } from "@/components/buttons/RectButton";
import { BorderTitle } from "@/components/headers/BorderTitle";
import { BasicSkeleton } from "@/components/skeletons/BasicSkeleton";

import styles from "./page.module.scss";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const currentParams = new URLSearchParams(Array.from(searchParams.entries())); // all current params
    console.log(currentParams.toString());
  }, [searchParams]);

  const cancel = () => {
    router.push("/webapp/home");
  };

  return (
    <div className={styles.container}>
      <BorderTitle
        fontSize="text-3xl"
        boderPadding="py-5"
        lineHeight="leading-normal"
        className={styles.title}
      >
        <h1>
          <span>あなたの候補をもとに</span>
          <span>検索しています</span>
        </h1>
      </BorderTitle>
      <div className={styles.skeleton}>
        <BasicSkeleton />
        <BasicSkeleton delay={1} />
      </div>
      <div className={styles.button}>
        <RectButton color="red" onClick={cancel}>
          キャンセル
        </RectButton>
      </div>
    </div>
  );
}
