"use client";

import LogoFullColorBeta from "@icons/logo-full-color-beta.svg";
import NavArrowLeft from "@icons/nav-arrow-left.svg";
import NavArrowRight from "@icons/nav-arrow-right.svg";
import Link from "next/link";

import { CirclesTopLeft } from "@/components/backgrounds/CirclesTopLeft";
import { SignupForm } from "@/components/forms/otp/SignupForm";

import styles from "./page.module.scss";

export default function Page() {
  return (
    <>
      <CirclesTopLeft />
      <div className={styles.container}>
        <div className={styles.head}>
          <h1 className={styles.title}>
            <span className={styles.logo}>
              <LogoFullColorBeta />
            </span>
          </h1>
          <span className={styles.description}>登録 / ログイン</span>
        </div>
        <SignupForm className={styles.form} />
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
        <div className={styles.additional}>
          <Link className={styles.main} href={"/webapp"}>
            ログインせずに試す&#40;ランキング機能のみ&#41;
          </Link>
        </div>
      </div>
    </>
  );
}
