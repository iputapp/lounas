"use client";

import { notFound, ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { RecommendResponse } from "@/app/api/v-beta/recommend";
import { RectButton } from "@/components/buttons/RectButton";
import { BorderTitle } from "@/components/headers/BorderTitle";
import { BasicSkeleton } from "@/components/skeletons/BasicSkeleton";

import styles from "./page.module.scss";

async function getRecommend(params: ReadonlyURLSearchParams) {
  const recommend = (await fetch(`/api/v-beta/recommend?${params.toString()}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return notFound();
    })) as RecommendResponse;

  return recommend;
}

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const currentParams = new URLSearchParams(Array.from(searchParams.entries())); // all current params
    console.log(currentParams.toString());
    /** fetch recommend */
    (async () => {
      const recommend = await getRecommend(searchParams);
      /** @todo timer and redirect to result page??? */
      console.log(recommend);
    })().catch((err) => {
      console.error(err);
    });
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
