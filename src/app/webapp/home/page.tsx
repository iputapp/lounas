"use client";

import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { Noto_Sans_JP } from "next/font/google";
import * as React from "react";

import { BorderCircleButton } from "@/components/buttons/BorderCircleButton";
import { BorderTitle } from "@/components/headers/BorderTitle";

import styles from "./page.module.scss";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
});

export default function Test() {
  const goGO = () => {
    console.log("GO!!");
  };
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();

  return (
    <div className={styles.container}>
      <div className={styles.bg}>
        <span className={`${styles.circle} ${styles.blue}`}></span>
        <span className={`${styles.circle} ${styles.cyan}`}></span>
        <span className={`${styles.circle} ${styles.green}`}></span>
      </div>
      <h1>こんにちは</h1>
      <div className={styles.record}>
        <div className={styles.date}>{`${year}年${month}月${day}日`}</div>
        <div className={styles.objective}>
          <div>今月の開拓数：</div>
          <div>3件</div>
        </div>
        <BorderLinearProgress variant="determinate" value={70} className={styles.bar} />
      </div>
      <div className={styles.section}>
        <BorderTitle
          title="あなたへのおすすめ"
          fontSize="text-3xl"
          className={`${styles.title} ${notoSansJP.className}`}
        />
        <div className={styles.text}>3つの質問からあなたにおすすめなお店を提案いたします。</div>
      </div>
      <div className="mx-auto w-5/12">
        <BorderCircleButton title="GO!" fontSize="text-4xl" outline onClick={goGO} />
      </div>
    </div>
  );
}
