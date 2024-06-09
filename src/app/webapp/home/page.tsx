"use client";

import { useRouter } from "next/navigation";
import useSWR from "swr";

import { VisitsCount } from "@/app/api/v-beta/user/visits-count";
import { BorderCircleButton } from "@/components/buttons/BorderCircleButton";
import { BorderTitle } from "@/components/headers/BorderTitle";
import { BasicLinearProgress } from "@/components/progresses/BasicLinearProgress";
import { fetcher } from "@/lib/swr";

import styles from "./page.module.scss";

export default function Page() {
  const router = useRouter();

  const { data, error, isLoading } = useSWR<VisitsCount>("/api/v-beta/user/visits-count", fetcher);

  const percent = (visitsCount: number) => {
    const visitPer = 5; // 100%/5件
    const mod = visitsCount % visitPer;
    const percent = (mod || !visitsCount ? mod : visitPer) * (100 / visitPer);
    return percent;
  };

  const startRecommend = () => {
    router.push("/recommend/explore");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>こんにちは</h1>
      <section className={styles.panel}>
        <div className={styles.date}>
          <span>
            {new Date().toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "short",
              day: "numeric",
              weekday: "short",
            })}
          </span>
        </div>
        <div className={styles.exp}>
          <div className={styles.text}>
            <span>今月の開拓数：</span>
            <span>{isLoading && !data ? (!error ? "読み込み中..." : "エラー") : `${data}件`}</span>
          </div>
          <BasicLinearProgress value={percent(data ?? 0)} />
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
