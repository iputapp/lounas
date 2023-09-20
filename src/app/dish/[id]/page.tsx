"use client";

import { useRouter } from "next/navigation";

import { BackButton } from "@/components/buttons/BackButton";
import { RectButton } from "@/components/buttons/RectButton";
import { Card } from "@/components/cards/Card";
import { ExpandablePanel } from "@/components/layouts/ExpandablePanel";
import { PaymentGrid } from "@/components/lists/PaymentGrid";

import styles from "./page.module.scss";

export default function Page() {
  const router = useRouter();
  const decision = () => {
    router.push("/restaurants/[id]/navi");
  };

  const now = new Date();

  const data = {
    timeOpen: now.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" }),
    timeClose: now.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" }),
    timeStay: 900, // seconds
    timeDuration: 300, // seconds
    payments: [
      {
        payment: "現金",
        accepted: true,
      },
      {
        payment: "PayPay",
        accepted: true,
      },
      {
        payment: "交通系IC",
        accepted: false,
      },
      {
        payment: "クレジット",
        accepted: false,
      },
    ],
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.backbutton}>
          <BackButton title="戻る" className="text-3xl" />
        </div>
        <div className={styles.card}>
          <Card alt="横浜家系らーめん塩ラーメン" image="/test/ramen.webp">
            <p>横浜家系らーめん</p>
            <p>塩ラーメン</p>
          </Card>
        </div>
        <div className={styles.panel}>
          <ExpandablePanel
            title="店舗詳細"
            titleEx="決済方法"
            childrenEx={<PaymentGrid payments={data.payments} />}
          >
            <ul className="grid justify-items-start gap-4">
              <li>
                <p>
                  全日：{data.timeOpen}～{data.timeClose}
                </p>
              </li>
              <li>
                <p>滞在時間：おおよそ{Math.floor(data.timeStay / 60)}分</p>
                <small className="text-xs">※混雑状況により異なります。</small>
              </li>
              <li>
                <p>片道：おおよそ{Math.floor(data.timeDuration / 60)}分</p>
              </li>
            </ul>
          </ExpandablePanel>
        </div>
        <div className={styles.rectbutton}>
          <RectButton color="blue" onClick={decision}>
            ここに行く
          </RectButton>
        </div>
      </div>
    </>
  );
}
