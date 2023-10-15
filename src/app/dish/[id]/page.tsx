import { notFound } from "next/navigation";

import type { Dish } from "@/app/api/v-beta/dish/[id]";
import { BackButton } from "@/components/buttons/BackButton";
import { Card } from "@/components/cards/Card";
import { ExpandablePanel } from "@/components/layouts/ExpandablePanel";
import { PaymentLong, PaymentType } from "@/components/lists/PaymentLong";

import { DecideButton } from "./client";
import styles from "./page.module.scss";

async function getDish(id: string) {
  const dish = (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v-beta/dish/${id}`)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return notFound();
    })) as Dish;

  return dish;
}

export default async function Page({ params }: { params: { id: string } }) {
  /** 料理詳細 */
  const dish = await getDish(params.id);
  /** 支払方法 */
  const payments = dish.restaurant.payments.map((payment) => ({
    type: payment.paymentType.name as PaymentType,
    accepted: payment.accepted,
    details: payment.details,
  }));
  const sortedPayments = payments.sort((a, b) => a.type.localeCompare(b.type));
  /** 営業時間 */
  const openTime = dish.restaurant.restaurantOpens.map((open) => ({
    weekDay: open.weekTypeId,
    weekDayName: open.weekType.name,
    timeOpen: new Date(open.timeOpen),
    timeClose: new Date(open.timeClose),
  }));
  const sortedOpenTime = openTime.sort((a, b) => a.weekDay - b.weekDay);
  /**
   * 営業時間 - 重複削除
   * The computational complexity is O(N^2), but with a maximum array length of 7, speed is guaranteed
   */
  const cleanOpenTime = sortedOpenTime.filter(
    (time, index, self) =>
      self.findIndex(
        (t) =>
          String(t.timeOpen) === String(time.timeOpen) &&
          String(t.timeClose) === String(time.timeClose)
      ) === index
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <BackButton title="戻る" />
      </div>
      <div className={styles.content}>
        <Card image={`/dishes/id/${dish.id}.webp`} alt={dish.name}>
          <p>{dish.name}</p>
          <p>{dish.restaurant.name}</p>
        </Card>
        <ExpandablePanel
          title="店舗詳細"
          bgImage={`/${dish.restaurant.id}.webp`}
          titleEx="決済方法"
          childrenEx={<PaymentLong payments={sortedPayments} />}
        >
          <ul className="grid justify-items-start gap-3">
            <li className="grid justify-items-start">
              <span>
                {cleanOpenTime.length > 1 ? "" : "全日"}：
                {cleanOpenTime[0].timeOpen.toLocaleTimeString("ja-JP", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                ～
                {cleanOpenTime[0].timeClose.toLocaleTimeString("ja-JP", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              {cleanOpenTime.length > 1 && (
                <small className="text-xs">
                  ※例外：{cleanOpenTime.map((time) => time.weekDayName).join(", ")}
                </small>
              )}
            </li>
            <li className="grid justify-items-start">
              <span>滞在時間：おおよそ{Math.floor(dish.eatTime / 60)}分</span>
              <small className="text-xs">※混雑状況により異なります。</small>
            </li>
            <li>
              <span>片道：おおよそ{Math.floor(dish.restaurant.travelTime / 60)}分</span>
            </li>
          </ul>
        </ExpandablePanel>
      </div>
      <div className={styles.footer}>
        <div className={styles.button}>
          <DecideButton dish={dish} />
        </div>
      </div>
    </div>
  );
}
