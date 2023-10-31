"use client";

import { useRouter } from "next/navigation";

import { BorderRoundButton } from "@/components/buttons/BorderRoundButton";
import { DummyPanel } from "@/components/layouts/DummyPanel";

import styles from "./page.module.scss";

/** @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config} */
export const dynamic = "force-dynamic";

export default function Page() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/signup");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>アカウント</h1>
      <div className={styles.sub}>
        <span className={styles.text}>lounasへようこそ！</span>
        <div className={styles.button}>
          <BorderRoundButton fontSize="text-2xl" onClick={handleSignIn}>
            Sign In
          </BorderRoundButton>
        </div>
      </div>
      <div className={styles.panel}>
        <DummyPanel>
          <div className="grid gap-4 text-neutral-800">
            <section className="grid justify-items-center">
              <span>このサービスについて</span>
            </section>
            <section className="grid gap-2">
              <div className="grid gap-1">
                <p>「lounas」は学生の短い昼食時間をより豊かにすることを目的としています。</p>
                <p>以下の機能を備えることで実現を目指します。</p>
              </div>
              <ul className="mx-auto grid w-[90%] list-['・'] gap-2 py-3">
                <li>あなたの今の気持ちを元におすすめ</li>
                <li>徒歩7分圏内のお店のみ</li>
                <li>シンプルで絶対に迷わないルート案内</li>
              </ul>
              <div className="grid gap-1">
                <p>ぜひご利用ください！</p>
              </div>
              <div className="hidden text-xs">
                <p className="flex items-center justify-between">
                  <span className="italic">Do not try to do everything. Do one thing well.</span>
                  <span>– Steve Jobs</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="italic">The biggest risk is not taking any risk.</span>
                  <span>– Mark Zuckerberg</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="italic">
                    Many things are improbable, only a few are impossible.
                  </span>
                  <span>– Elon Musk</span>
                </p>
              </div>
            </section>
          </div>
        </DummyPanel>
      </div>
    </div>
  );
}
