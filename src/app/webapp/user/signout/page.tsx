"use client";

import Lock from "@icons/lock.svg";
import NavArrowRight from "@icons/nav-arrow-right.svg";
import Send from "@icons/send.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./page.module.scss";

export default function Page() {
  const router = useRouter();

  const listItems = [
    {
      title: "プライバシー",
      icon: <Lock />,
      url: "/privacy",
      isInternal: true,
    },
    {
      title: "お問い合わせ",
      icon: <Send />,
      url: "mailto:info&#64;example.com",
      isInternal: false,
    },
  ];

  const signIn = () => {
    router.replace("/webapp/user/signout");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>アカウント</h1>
      <div className={styles.sub}>
        <span className={styles.text}>ご利用ありがとうございます。</span>
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
