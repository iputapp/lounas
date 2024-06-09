"use client";

import NavArrowRight from "@icons/nav-arrow-right.svg";
import { useState } from "react";

import { MediaLinks } from "@/_constants/links";
import { DialogInfo } from "@/components/dialogs/DialogInfo";
import { VerificationForm } from "@/components/forms/otp/VerificationForm";

import styles from "./page.module.scss";

export default function Page() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>確認コードの入力</h1>
          <section className={styles.description}>
            <p>
              <span>メールに送付されている</span>
            </p>
            <p>
              <span className="underline decoration-solid">6</span>
              <span>桁のコードを入力してください</span>
            </p>
          </section>
        </div>
        <VerificationForm className={styles.form} />
        {/* dialog info */}
        <button className={styles.help} onClick={() => setIsDialogOpen((prev) => !prev)}>
          <span className={styles.icon}>
            <NavArrowRight />
          </span>
          <span>確認コードが届きません。</span>
        </button>
      </div>
      <DialogInfo title="確認コードが届きません" isOpen={isDialogOpen} setIsOpen={setIsDialogOpen}>
        <article className="grid gap-6 text-sm">
          <section>確認コードが届かない場合は、以下の点をご確認ください。</section>
          <section className="grid gap-5">
            <ol className="mx-auto grid w-fit list-decimal gap-4">
              <li>迷惑メールフォルダを確認する</li>
              <li>メールアドレスが正しいかを確認する</li>
              <li>noreply@lounas.jp の受信を許可する</li>
              <li>ネットワーク状況を確認する</li>
            </ol>
            <span>解決しない場合は、恐れ入りますがアプリ開発サークルまでご連絡ください。</span>
          </section>
          <section className="mx-auto">
            <a
              className="text-blue-600 underline decoration-solid"
              href={MediaLinks.FEEDBACK_FORM}
              target="_blank"
              rel="noopener noreferrer"
            >
              お問い合わせフォーム
            </a>
          </section>
        </article>
      </DialogInfo>
    </>
  );
}
