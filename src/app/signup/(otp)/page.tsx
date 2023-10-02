"use client";

import NavArrowLeft from "@icons/nav-arrow-left.svg";
import NavArrowRight from "@icons/nav-arrow-right.svg";
import Link from "next/link";

import { CirclesTopLeft } from "@/components/backgrounds/CirclesTopLeft";
import { SignupForm } from "@/components/forms/SignupForm";

import styles from "./page.module.scss";

export default function Page() {
  return (
    <>
      <CirclesTopLeft />
      <div className={styles.container}>
        <h1 className={styles.title}>ようこそ</h1>
        <SignupForm className={styles.form} />
        <div className={styles.additional}>
          <span>登録せずに試す&#40;ランキング機能のみ&#41;</span>
        </div>
        <div className={styles.tos}>
          <Link href={"/tos"} target="_blank" rel="noopener noreferrer">
            <span>
              <NavArrowRight />
            </span>
            <span>利用規約はこちら</span>
            <span>
              <NavArrowLeft />
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
