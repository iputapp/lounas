"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { RectButton } from "@/components/buttons/RectButton";
import { DialogInfo } from "@/components/dialogs/DialogInfo";
import { PrivacyPlayer } from "@/components/lottie/Privacy";

import styles from "./page.module.scss";

export default function Page() {
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
        <h1 className={styles.title}>データ利用</h1>
        <p className={styles.text}>
          このアプリではユーザーがより便利にお使いいただける用に情報提供の協力をお願いしています。
        </p>
      </div>
      <button onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.dialoginfo}>私たちが考えるプライバシーについて詳しく知る</span>
      </button>
      <DialogInfo title="確認コードが届かない" isOpen={isOpen} setIsOpen={setIsOpen}>
        <article className="grid h-full w-full gap-8 text-sm font-semibold">
          <section>確認コードが届かない場合は以下の対処法をお試しください。</section>
          <section>
            <ol className="mx-auto grid w-fit list-decimal gap-4">
              <li>迷惑メールを確認する</li>
              <li>メールのフィルタ設定を確認する</li>
              <li>ネットワーク状況を確認する</li>
            </ol>
          </section>
          <section>
            対処法をお試し頂いても解決しない場合は、お手数ですがサポートまでお問い合わせください。
          </section>
        </article>
      </DialogInfo>

      <div className={styles.animation}>
        <PrivacyPlayer />
      </div>
      <div className={styles.choice}>
        <div className={styles.query}>
          <span>同意いただけない場合は</span>
          <span>ランキング機能のみのご利用になります。</span>
        </div>
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
