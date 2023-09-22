"use client";

import Lock from "@icons/lock.svg";
import NavArrowRight from "@icons/nav-arrow-right.svg";
import Send from "@icons/send.svg";
import { useRouter } from "next/navigation";

import styles from "./page.module.scss";

export default function Page() {
  const router = useRouter();

  const listItems = [
    {
      title: "プライバシー",
      icon: <Lock />,
    },
    {
      title: "お問い合わせ",
      icon: <Send />,
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
          {listItems.map((item, index) => (
            <section key={index}>
              <div>
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </div>
              <span>
                <NavArrowRight />
              </span>
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
