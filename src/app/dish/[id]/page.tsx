"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { BackButton } from "@/components/buttons/BackButton";
import { RectButton } from "@/components/buttons/RectButton";
import { Card } from "@/components/cards/Card";
import { ExpandablePanel } from "@/components/layouts/ExpandablePanel";
import { PaymentLong, PaymentType } from "@/components/lists/PaymentLong";
import type { Dish, Restaurant } from "@/lib/zod";

import styles from "./page.module.scss";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();

  useEffect(() => {
    console.log("料理ID:", params.id);
  }, [params]);

  /** テスト用 料理データ */
  const dish: Dish = {
    id: params.id,
    urlId: params.id,
    createdAt: new Date("2023-09-21T01:02:34.069Z"),
    updatedAt: new Date("2023-09-21T01:23:45.069Z"),
    name: "MAXラーメン",
    description:
      "言わずと知れた、壱角家の看板メニュー！\nチャーシュー3枚、海苔が6枚、味玉も乗って、まさにいいとこどりのMAXラーメン。\n見て満足、食べて満足。壱角家の一番人気！",
    price: 980,
    amount: 75,
    eatTime: 360, // 6分
    restaurantId: "a1199e64-f208-4300-a83e-8d5484d3ea3c",
    thumbnailId: "katsudon", // params.id
  };

  /** テスト用 お店データ */
  type RestaurantExtend = Restaurant & {
    timeOpen: Date;
    timeClose: Date;
  };
  const restaurant: RestaurantExtend = {
    id: "a1199e64-f208-4300-a83e-8d5484d3ea3c",
    urlId: "a1199e64-f208-4300-a83e-8d5484d3ea3c",
    createdAt: new Date("2023-09-21T01:02:34.069Z"),
    updatedAt: new Date("2023-09-21T01:23:45.069Z"),
    name: "横浜家系ラーメン 壱角家 西新宿店",
    description: "トッピングし放題！ネギの入れすぎに注意！\nカウンター・テーブルあり。",
    address: "東京都新宿区西新宿1-14-5 新和ビル 1F",
    website: "https://ichikakuya.com/",
    longtitude: 139.691706,
    latitude: 35.691706,
    travelTime: 300, // 5分
    timeOpen: new Date("1900-01-01T02:00:00.000Z"),
    timeClose: new Date("1900-01-01T15:00:00.000Z"),
  };

  /** テスト用 支払方法 */
  const payments = [
    { payment: "cash" as PaymentType, accepted: true },
    { payment: "credit" as PaymentType, accepted: true },
    { payment: "transport" as PaymentType, accepted: true },
    { payment: "qr" as PaymentType, accepted: false },
  ];

  /** テスト用 api route から返ってくるデータ (予定) */
  const data = {
    dish: dish,
    restaurant: restaurant,
    payments: payments,
  };

  const decide = () => {
    router.push(`/restaurant/${data.restaurant.urlId}/navi`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <BackButton title="戻る" />
      </div>
      <div className={styles.content}>
        <Card image={`/test/${data.dish.thumbnailId}.webp`} alt={data.dish.name}>
          <p>{data.dish.name}</p>
          <p>{data.restaurant.name}</p>
        </Card>
        <ExpandablePanel
          title="店舗詳細"
          bgImage={`/test/${data.dish.thumbnailId}.webp`}
          titleEx="決済方法"
          childrenEx={<PaymentLong payments={data.payments} />}
        >
          <ul className="grid justify-items-start gap-3">
            <li>
              <span>
                全日：
                {data.restaurant.timeOpen.toLocaleTimeString("ja-JP", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                ～
                {data.restaurant.timeClose.toLocaleTimeString("ja-JP", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </li>
            <li className="grid">
              <span>滞在時間：おおよそ{Math.floor(data.dish.eatTime / 60)}分</span>
              <small className="text-xs">※混雑状況により異なります。</small>
            </li>
            <li>
              <span>片道：おおよそ{Math.floor(data.restaurant.travelTime / 60)}分</span>
            </li>
          </ul>
        </ExpandablePanel>
      </div>
      <div className={styles.footer}>
        <div className={styles.button}>
          <RectButton color="blue" onClick={decide}>
            ここに行く
          </RectButton>
        </div>
      </div>
    </div>
  );
}
