"use client";

import { BackButton } from "@/components/buttons/BackButton";
import { RectButton } from "@/components/buttons/RectButton";
import { Card } from "@/components/cards/Card";
import { ExpandablePanel } from "@/components/layouts/ExpandablePanel";
import { PaymentGrid } from "@/components/lists/PaymentGrid";

export default function Dishes() {
  const cancel = () => {
    console.log("キャンセルよ");
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
      <div className="flex flex-col justify-items-center gap-8 p-4">
        <div className="flex h-1/6 justify-start">
          <BackButton title="戻る" className="text-3xl" />
        </div>
        <div>
          <Card title="guitaさふぁf" image="/test/ramen.webp" />
        </div>
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
        <div className="flex justify-center">
          <RectButton text="ここに行く" color="blue" onClick={cancel} />
        </div>
      </div>
    </>
  );
}
