"use client";

import Lock from "@icons/lock.svg";
import NavArrowRight from "@icons/nav-arrow-right.svg";
import Send from "@icons/send.svg";
import { useRouter } from "next/navigation";

import styles from "./page.module.scss";

export default function Page() {
  const router = useRouter();
  const signIn = () => {
    router.push("/webapp/user/signin");
  };
  const privacyPage = () => {
    router.replace("/privacy");
  };

  return (
    <>
      <div className={styles.main}>
        <h1 className={styles.title}>アカウント</h1>
        <div className={styles.text}>日々のご愛顧ありがとうございます。</div>
        <div className={styles.container}>
          <button className={styles.button} onClick={signIn}>
            <div className={styles.inner}>&emsp;Sign Out&emsp;</div>
          </button>
        </div>

        <div className={styles.supportContent}>
          <button className={`${styles.supportItem} ${styles.border}`} onClick={privacyPage}>
            <span className={styles.category}>
              <Lock />
              <div className={styles.categoryName}>プライバシー</div>
            </span>
            <span>
              <NavArrowRight />
            </span>
          </button>
          <a href="mailto:info&#64;example.com" className={styles.supportItem}>
            <span className={styles.category}>
              <Send />
              <div className={styles.categoryName}>お問い合わせ</div>
            </span>
            <span>
              <NavArrowRight />
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
