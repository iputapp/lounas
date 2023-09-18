"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { RectButton } from "@/components/buttons/RectButton";
import { DialogInfo } from "@/components/dialogs/DialogInfo";
import { PrivacyPlayer } from "@/components/lottie/Privacy";

import styles from "./page.module.scss";

export default function Privacy() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const refuse = () => {
    router.replace("/signup");
  };
  const permission = () => {
    router.replace(`webapp/home`);
  };

  return (
    <main className={styles.main}>
      <div className={styles.privacy}>
        <h1 className={styles.title}>プライバシー</h1>
        <p className={styles.text}>
          このアプリではユーザーがより便利にお使いいただける用に情報提供の協力をお願いしています。
        </p>
      </div>
      <button onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.dialoginfo}>私たちが考えるプライバシーについて詳しく知る</span>
      </button>
      <DialogInfo header="確認コードが届きません" isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="flex flex-col space-y-5">
          <h4>１．利用目的</h4>
          <p>本校は、収集した個人情報について、以下の目的のために利用いたします。</p>
          <ul>
            <li>
              ①成績管理、学籍管理、進路指導、就職活動支援、奨学金管理、課外活動支援など、生徒の指導管理に関する業務のため
            </li>
            <li>
              ②成績表送付、学費納入通知、口座情報管理、保護者説明会の運営など、保護者への通知などに関する業務のため
            </li>
            <li>
              ③卒業・成績・在籍の証明、調査書発行、同窓会運営など、卒業した生徒との連携に関する業務のため
            </li>
          </ul>
          <h4>２．第三者提供</h4>
          <p>本校は、以下の場合を除いて、個人データを第三者へ提供することはしません。</p>
          <ul>
            <li>①保護者などから同意を得ている場合 ②法令に基づく場合</li>
            <li>③人の生命・身体・財産を保護するために必要で、本人から同意を得ることが難しい場合</li>
            <li>
              ④国の機関や地方公共団体、その委託者などによる法令事務の遂行にあたって協力する必要があり、かつ本人の同意を得ることで事務遂行に影響が生じる可能性がある場合
            </li>
            <li>⑤PTA・後援会・同窓会などの活動にかかわる場合</li>
          </ul>
          <h4>３．開示請求</h4>
          <ul>
            <li>
              貴殿の個人情報について、ご本人には、開示・訂正・削除・利用停止を請求する権利があります。手続きにあたっては、ご本人確認のうえ対応させていただきますが、代理人の場合も可能です。詳細については、以下「個人情報相談窓口」へご連絡ください。
            </li>
          </ul>
          <div className="flex items-center justify-end">
            <small className="my-4">個人情報相談窓口</small>
          </div>
        </div>
      </DialogInfo>

      <div className={styles.animation}>
        <PrivacyPlayer />
      </div>
      <div className={styles.choice}>
        <h1 className={styles.query}>トラッキングを許可しますか？</h1>
        <div className={styles.button}>
          <RectButton color="red" onClick={refuse}>
            拒否する
          </RectButton>
          <RectButton color="blue" onClick={permission}>
            許可する
          </RectButton>
        </div>
      </div>
    </main>
  );
}
