"use client";

import { useRouter } from "next/navigation";

import { BorderRoundButton } from "@/components/buttons/BorderRoundButton";
import { DummyPanel } from "@/components/layouts/DummyPanel";

import styles from "./page.module.scss";

export default function Page() {
  const router = useRouter();

  const signOut = () => {
    router.replace("/webapp/user/signout");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>アカウント</h1>
      <div className={styles.sub}>
        <span className={styles.text}>IMAP会員へようこそ！</span>
        <div className={styles.button}>
          <BorderRoundButton fontSize="text-2xl" onClick={signOut}>
            Sign In
          </BorderRoundButton>
        </div>
      </div>
      <div className={styles.panel}>
        <DummyPanel>
          <div className="grid gap-4 text-neutral-800">
            <section className="grid justify-items-center">
              <p>このアプリについて</p>
            </section>
            <section>
              <p>私たちは、多様なバックグラウンドや経験を持つ個々の個人から成るグループです。</p>
              <p>
                共に協力し合い、様々な問題を解決していく中で、私たちの成長と共に、より良い未来を築くことを目標としています。
              </p>
              <p>
                互いに尊重し、協力し、理解し合うことを大切にし、さまざまな視点やアイデアを活用していきます。
              </p>
            </section>
          </div>
        </DummyPanel>
      </div>
    </div>
  );
}
