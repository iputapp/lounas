"use client";

import NavArrowRight from "@icons/nav-arrow-right.svg";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";

import { messages, settings } from "./constants";
import styles from "./page.module.scss";

export default function Page() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [messageToUser, setMessageToUser] = useState("");

  /** ガチャ */
  const messageGacha = () => {
    const rand = Math.floor(Math.random() * 100) + 1;
    for (const message of messages) {
      if (rand < message.prob) {
        return message.message;
      } else {
        return messages[messages.length - 1].message;
      }
    }
  };

  useLayoutEffect(() => {
    const message = messageGacha() as string;
    setMessageToUser(message);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth
      .signOut()
      .then((res) => {
        if (res.error) {
          console.error("Error!", res.error.status);
          throw new Error(res.error.message);
        }

        router.replace("signin");
      })
      .catch((err) => console.error("Error!", err));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>アカウント</h1>
      <div className={styles.sub}>
        <span className={styles.text}>{messageToUser}</span>
        <div className={styles.button}>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>
      <div className={styles.panel}>
        <article>
          {settings.map((item, index) =>
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
