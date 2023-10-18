"use client";

import LinkIcon from "@icons/link.svg";
import NavArrowRight from "@icons/nav-arrow-right.svg";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { DialogAlert } from "@/components/dialogs/DialogAlert";

import { messages, settings } from "./constants";
import styles from "./page.module.scss";

export default function Page() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [messageToUser, setMessageToUser] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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

  useEffect(() => {
    const message = messageGacha() as string;
    setMessageToUser(message);
  }, []);

  /** dialog alert yes */
  const handleYes = async () => {
    /** set state processing */
    setIsProcessing(true);

    /** sign-out */
    await supabase.auth
      .signOut()
      .then((res) => {
        if (res.error) {
          console.error("Error!", res.error.status);
          throw new Error(res.error.message);
        }
        /** open dialog alert */
        setIsOpen(false);
        router.replace("signin");
      })
      .catch((err) => console.error("Error!", err))
      .finally(() => {
        setIsOpen(false);
        setIsProcessing(false);
      });
  };

  /** dialog alert no */
  const handleNo = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>アカウント</h1>
        <div className={styles.sub}>
          <span className={styles.text}>{messageToUser}</span>
          <div className={styles.button}>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <button onClick={() => setIsOpen(true)}>Sign Out</button>
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
                  <div>
                    <span>
                      <LinkIcon />
                    </span>
                    <span>
                      <NavArrowRight />
                    </span>
                  </div>
                </a>
              )
            )}
          </article>
        </div>
      </div>
      <DialogAlert
        title="サインアウトしますか？"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClickYes={handleYes}
        onClickNo={handleNo}
        isProcessing={isProcessing}
      >
        <div className="grid gap-1.5 text-center text-sm font-semibold">
          <p>※再度確認コードのログインが必要になります。</p>
        </div>
      </DialogAlert>
    </>
  );
}
