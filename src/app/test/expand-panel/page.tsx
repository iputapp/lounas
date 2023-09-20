"use client";
import Drag from "@icons/drag.svg";
import { useState } from "react";

import { CardHorizontal } from "@/components/cards/CardHorizontal";
import { ExpandablePanel } from "@/components/layouts/ExpandablePanel";
import { PaymentGrid } from "@/components/lists/PaymentGrid";

import styles from "./page.module.scss";

export default function Test() {
  const now = new Date();
  const [expanded, setExpanded] = useState(false);
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
    <div className="h-screen w-full bg-gradient-to-b from-indigo-300 to-sky-300 p-4">
      <div className="grid gap-5">
        <CardHorizontal
          title="カード"
          image="/icons/media-image.svg"
          tag={1}
          description=""
          url=""
        />
        <CardHorizontal
          title="カード"
          image="/icons/media-image.svg"
          tag={1}
          description=""
          url=""
        />
        <button className={styles.panel} onClick={() => setExpanded(!expanded)}>
          <ul className={styles.panelContent}>
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
          <Drag />
        </button>
        <ExpandablePanel
          title="店舗詳細"
          titleEx="決済方法"
          childrenEx={<PaymentGrid payments={data.payments} />}
          setExpanded={setExpanded}
          expanded={expanded}
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
    </div>
  );
}
