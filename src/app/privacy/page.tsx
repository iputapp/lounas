"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { RectButton } from "@/components/buttons/RectButton";
import { DialogInfo } from "@/components/dialogs/DialogInfo";
import { PrivacyPlayer } from "@/components/lottie/Privacy";

import styles from "./page.module.scss";

export default function Page() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleAgreement = () => {
    router.push("/webapp/home");
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>データ利用</h1>
        <div className={styles.description}>
          <p>このアプリではユーザーがより便利にお使いいただくために情報提供をお願いしています。</p>
          <button className={styles.dialoginfo} onClick={() => setIsOpen((prev) => !prev)}>
            <span>私たちが考えるプライバシーについて詳しく知る</span>
          </button>
        </div>
        <div className={styles.animation}>
          <PrivacyPlayer />
        </div>
        <div className={styles.choice}>
          <div className={styles.query}>
            <span>同意いただけない場合は</span>
            <span>ランキング機能のみのご利用になります。</span>
          </div>
          <div className={styles.button}>
            <RectButton color="red" onClick={handleAgreement}>
              同意しない
            </RectButton>
            <RectButton color="blue" onClick={handleAgreement}>
              同意する
            </RectButton>
          </div>
        </div>
      </div>
      <DialogInfo title="私たちが考えるプライバシー" isOpen={isOpen} setIsOpen={setIsOpen}>
        <article className="grid h-full w-full gap-8 text-xs font-semibold">
          <section>
            <p>
              私たちのアプリは、より良いユーザーエクスペリエンスを提供するために一部のデータを収集・トラッキングしています。
            </p>
            <p>このデータはパーソナライズやアプリの最適化に使用されます。</p>
            <p>以下の項目について、ご了承いただきトラッキングの許可をお願いいたします。</p>
          </section>
          <section>
            <ol className="mx-4 grid w-fit list-decimal gap-4">
              <li>
                <p>デバイス情報の収集</p>
                <p>
                  アプリの正常な動作とセキュリティ保護のため、デバイスの識別子やオペレーティングシステムのバージョンなどの情報を収集します。
                </p>
              </li>
              <li>
                <p>ユーザーアクティビティの追跡</p>
                <p>
                  アプリ内での操作や使用履歴の収集により、より適切な広告や推奨コンテンツを表示できるようになります。
                </p>
              </li>
              <li>
                <p>位置情報の取得</p>
                <p>
                  位置情報を利用して、近くの店舗やサービスの情報を提供する場合があります。位置情報は厳密に匿名化され、個別のユーザーを特定するためには使用されません。
                </p>
              </li>
              <li>
                <p>サードパーティとのデータ共有</p>
                <p>
                  私たちは、信頼できるパートナーと共有することで広告のターゲティングやアプリの改善を目指しています。ただし、個人を特定する情報は共有されません。
                </p>
              </li>
            </ol>
          </section>
          <section>
            <p>プライバシーとデータセキュリティは、私たちにとって非常に重要です。</p>
            <p>私たちは収集されたデータを厳格に管理し、第三者には適切な 安全保護措置を講じます。</p>
          </section>
          <section>
            <p>
              このトラッキング許可は任意であり、アプリ内の設定からトラッキングのオプトアウトやオプトインを選択できます。
            </p>
          </section>
          <section>
            <p>ご不明な点や懸念事項がありましたら、いつでもお問い合わせください。</p>
          </section>
        </article>
      </DialogInfo>
    </>
  );
}
