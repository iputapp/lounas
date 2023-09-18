"use client";

import { BorderRoundButton } from "@/components/buttons/BorderRoundButton";
import { DummyPanel } from "@/components/layouts/DummyPanel";
import { BottomNavigationBar } from "@/components/navigations/BottomNavigationBar";

import styles from "./page.module.scss";

export default function Test() {
  const onClick = () => {
    console.log("clicked");
  };

  return (
    <div className="relative h-full overflow-hidden">
      <div className={styles.bg}>
        <span className={`${styles.triangle} ${styles.blue}`}></span>
        <span className={`${styles.triangle} ${styles.cyan1}`}></span>
        <span className={`${styles.triangle} ${styles.green}`}></span>
        <span className={`${styles.triangle} ${styles.cyan2}`}></span>
      </div>
      <div className={styles.main}>
        <div className={styles.title}>アカウント</div>
        <div className={styles.go}>
          <div className={styles.text}>IMAP会員へようこそ !</div>
          <div className={styles.button}>
            <BorderRoundButton fontSize="text-2xl" onClick={onClick}>
              Sign In
            </BorderRoundButton>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-5/6">
            <DummyPanel>
              <p>
                こんにちは!!!!! 僕の名前は、、、、
                ピカソのフルネームはパブロ・ディエーゴ・ホセ・フランシスコ・デ・パウラ・ホアン・ネポムセーノ・マリーア・デ・ロス・レメディオス・クリスピーン・クリスピアーノ・デ・ラ・サンティシマ・トリニダード・ルイス・イ・ピカソ。
                です。。。 よろしくお願いします！！明日からよろしくお願いします！！
              </p>
            </DummyPanel>
          </div>
        </div>
      </div>
      <BottomNavigationBar />
    </div>
  );
}
