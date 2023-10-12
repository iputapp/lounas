"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

import { BorderCircleButton } from "@/components/buttons/BorderCircleButton";
import { BorderTitle } from "@/components/headers/BorderTitle";
import { BasicLinearProgress } from "@/components/progresses/BasicLinearProgress";

import styles from "./page.module.scss";

export default function Page() {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [bar, setBar] = useState(0);

  const visitPer = 5; // 100%/5件

  useEffect(() => {
    /** today */
    setDate(new Date());

    fetch("/api/v-beta/user/visits-count")
      .then(async (res) => {
        const visitCount = z.number().parse(await res.json());

        /** progress bar */
        const mod = visitCount % visitPer;
        const percent = (mod || !visitCount ? mod : visitPer) * (100 / visitPer);
        setBar(percent);
      })
      .catch((err) => {
        // 404など
      });
  }, []);

  const startRecommend = () => {
    router.push("/recommend/explore");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>こんにちは</h1>
      <section className={styles.panel}>
        <div className={styles.date}>
          {date ? (
            <span>
              {date.toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          ) : null}
        </div>
        <div className={styles.exp}>
          <div className={styles.text}>
            <span>今月の開拓数：</span>
            <span>{visitCount}件</span>
          </div>
          <BasicLinearProgress value={bar} />
        </div>
        <div></div>
      </section>
      <section className={styles.content}>
        <BorderTitle fontSize="text-3xl" className={styles.title}>
          <h2>あなたへのおすすめ</h2>
        </BorderTitle>
        <div className={styles.description}>
          <span>3つの質問からあなたにおすすめなお店を提案いたします。</span>
        </div>
        <div className={styles.button}>
          <BorderCircleButton fontSize="text-3xl" outline onClick={startRecommend}>
            GO!
          </BorderCircleButton>
        </div>
      </section>
    </div>
  );
}
