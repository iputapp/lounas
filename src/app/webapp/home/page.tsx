"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { VisitsCount } from "@/app/api/v-beta/user/visits-count";
import { BorderCircleButton } from "@/components/buttons/BorderCircleButton";
import { BorderTitle } from "@/components/headers/BorderTitle";
import { BasicLinearProgress } from "@/components/progresses/BasicLinearProgress";

import styles from "./page.module.scss";

async function getVisitsCount() {
  /** @todo cache settings */
  const visitsCount = (await fetch("/api/v-beta/user/visits-count")
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return null;
    })) as VisitsCount | null;
  return visitsCount;
}

export default function Page() {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [status, setStatus] = useState<{ count: number | null; bar: number }>({ count: 0, bar: 0 });

  const visitPer = 5; // 100%/5件

  useEffect(() => {
    /** today */
    setDate(new Date());
    /** error status */
    const errorStatus = {
      count: null,
      bar: 0,
    };
    /** visits count */
    (async () => {
      const visitsCount = await getVisitsCount();
      if (visitsCount !== null) {
        /** progress bar */
        const mod = visitsCount % visitPer;
        const percent = (mod || !visitsCount ? mod : visitPer) * (100 / visitPer);
        const newStatus = {
          count: visitsCount,
          bar: percent,
        };
        setStatus(newStatus);
      } else {
        setStatus(errorStatus);
      }
    })().catch((err) => {
      console.error(err);
      setStatus(errorStatus);
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
                weekday: "short",
              })}
            </span>
          ) : null}
        </div>
        <div className={styles.exp}>
          <div className={styles.text}>
            <span>今月の開拓数：</span>
            <span>{status.count ?? "エラーやで"}件</span>
          </div>
          <BasicLinearProgress value={status.bar} />
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
