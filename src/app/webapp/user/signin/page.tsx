"use client";
import { BorderRoundButton } from "@/components/buttons/BorderRoundButton";
import { Thisapp } from "@/components/dummy/ThisApp";

import styles from "./page.module.scss";

export default function Test() {
  const onClick = () => {
    console.log("clicked");
  };

  return (
    <div className={styles.main}>
      <div className={styles.title}>アカウント</div>
      <div className={styles.go}>
        <div className={styles.text}>IMAP会員へようこそ !</div>
        <div className={styles.button}>
          <BorderRoundButton fontSize="text-2xl" onClick={onClick}>
            &emsp;Sign IN&emsp;
          </BorderRoundButton>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Thisapp>
          <p className=" break-words">
            こんにちは!!!!! 僕の名前は、、、、
            ピカソのフルネームはパブロ・ディエーゴ・ホセ・フランシスコ・デ・パウラ・ホアン・ネポムセーノ・マリーア・デ・ロス・レメディオス・クリスピーン・クリスピアーノ・デ・ラ・サンティシマ・トリニダード・ルイス・イ・ピカソ。
            です。。。 よろしくお願いします！！明日からよろしくお願いします！！
          </p>
        </Thisapp>
      </div>
    </div>
  );
}
