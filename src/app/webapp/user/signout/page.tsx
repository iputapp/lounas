"use client";

import Lock from "@icons/lock.svg";
import NavArrowRight from "@icons/nav-arrow-right.svg";
import Send from "@icons/send.svg";
import { useRouter } from "next/navigation";

import styles from "./page.module.scss";

export default function SignOut() {
  const router = useRouter();
  const onClick = () => {
    router.push("/webapp/user/signin");
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.title}>アカウント</div>
        <div className={styles.container}>
          <button className={styles.button} onClick={onClick}>
            <div className={styles.inner}>&emsp;Sign Out&emsp;</div>
          </button>
        </div>

        <div className={styles.select}>
          <button className={styles.lock}>
            <span className={styles.privacy}>
              <Lock />
              <div className={styles.privacytext}>プライバシー</div>
            </span>
            <span className={styles.arrow}>
              <NavArrowRight />
            </span>
          </button>
          <a href="mailto:info&#64;example.com" className={styles.mail}>
            <span className={styles.inquiry}>
              <Send />
              <div className={styles.inquirytext}>お問い合わせ</div>
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
