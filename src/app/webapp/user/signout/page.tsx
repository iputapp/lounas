"use client";

import Github from "@icons/github.svg";
import Instagram from "@icons/instagram.svg";
import Lock from "@icons/lock.svg";
import NavArrowRight from "@icons/nav-arrow-right.svg";
import Twitter from "@icons/twitter.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "./page.module.scss";

/** リスト一覧 */
const listItems = [
  {
    title: "プライバシー",
    icon: <Lock />,
    url: "/privacy",
    isInternal: true,
  },
  {
    title: "バグの報告",
    icon: <Github />,
    url: "https://github.com/wiyco/imap/issues/new?assignees=&labels=bug%2Ctriage&projects=&template=bug-report.yml&title=%5BBug%5D%3A+%7B%E6%A6%82%E8%A6%81%7D",
    isInternal: false,
  },
  {
    title: "Instagram",
    icon: <Instagram />,
    url: "https://www.instagram.com/imap_bq/",
    isInternal: false,
  },
  {
    title: "Twitter",
    icon: <Twitter />,
    url: "https://twitter.com/imap_bq",
    isInternal: false,
  },
];

/** ユーザへのメッセージ */
const messages = [
  "ご利用ありがとうございます。",
  "日々のご愛顧ありがとうございます。",
  "おおきに。",
];

export default function Page() {
  const router = useRouter();
  const [messageToUser, setMessageToUser] = useState("");

  useEffect(() => {
    setMessageToUser(messages[Math.floor(Math.random() * messages.length)]);
  }, []);

  const signIn = () => {
    router.replace("/webapp/user/signout");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>アカウント</h1>
      <div className={styles.sub}>
        <span className={styles.text}>{messageToUser}</span>
        <div className={styles.button}>
          <button onClick={signIn}>Sign Out</button>
        </div>
      </div>
      <div className={styles.panel}>
        <article>
          {listItems.map((item, index) =>
            item.isInternal ? (
              <Link key={index} href={item.url}>
                <div>
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </div>
                <span>
                  <NavArrowRight />
                </span>
              </Link>
            ) : (
              <a key={index} href={item.url} target="_blank" rel="noopener noreferrer">
                <div>
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </div>
                <span>
                  <NavArrowRight />
                </span>
              </a>
            )
          )}
        </article>
      </div>
    </div>
  );
}
