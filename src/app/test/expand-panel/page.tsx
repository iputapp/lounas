"use client";

import { RectButton } from "@/components/buttons/RectButton";
import { CardHorizontal } from "@/components/cards/CardHorizontal";
import { ExpandablePanel } from "@/components/layouts/ExpandablePanel";
import { PaymentLong, PaymentType } from "@/components/lists/PaymentLong";

export default function Test() {
  const now = new Date();

  const data = {
    timeOpen: now.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" }),
    timeClose: now.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" }),
    timeStay: 900, // seconds
    timeDuration: 300, // seconds
    payments: [
      { payment: "cash" as PaymentType, accepted: true },
      { payment: "credit" as PaymentType, accepted: true },
      { payment: "transport" as PaymentType, accepted: true },
      { payment: "qr" as PaymentType, accepted: true },
    ],
  };

  return (
    <div className="h-screen w-full bg-gradient-to-b from-indigo-300 to-sky-300 p-4">
      <div className="grid gap-5">
        <CardHorizontal url="/" title="カード" image="/icons/media-image.svg" tag={1} />
        <CardHorizontal url="/" title="カード" image="/icons/media-image.svg" tag={1} />
        <ExpandablePanel
          title="店舗詳細"
          titleEx="決済方法"
          childrenEx={<PaymentLong payments={data.payments} />}
        >
          <ul className="grid justify-items-start gap-4">
            <li>
              <span>
                全日：{data.timeOpen}～{data.timeClose}
              </span>
            </li>
            <li className="grid">
              <span>滞在時間：おおよそ{Math.floor(data.timeStay / 60)}分</span>
              <small className="text-xs">※混雑状況により異なります。</small>
            </li>
            <li>
              <span>片道：おおよそ{Math.floor(data.timeDuration / 60)}分</span>
            </li>
          </ul>
        </ExpandablePanel>
        <div className="mx-auto w-fit">
          <RectButton color="blue" onClick={() => console.log("ここに行く")}>
            ここに行く
          </RectButton>
        </div>
      </div>
    </div>
  );
}
