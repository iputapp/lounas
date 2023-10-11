"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { DishResponse, dishResponseSchema } from "@/app/api/v-beta/dish/[id]";
import { VisitRegisterRequest } from "@/app/api/v-beta/user/visit/new";
import { BackButton } from "@/components/buttons/BackButton";
import { RectButton } from "@/components/buttons/RectButton";
import { Card } from "@/components/cards/Card";
import { ExpandablePanel } from "@/components/layouts/ExpandablePanel";
import { PaymentLong } from "@/components/lists/PaymentLong";

import styles from "./page.module.scss";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [dishData, setDishData] = useState<DishResponse>(null);

  useEffect(() => {
    console.log("料理ID:", params.id);

    fetch(`/api/v-beta/dish/${params.id}`)
      .then(async (res) => {
        setDishData(dishResponseSchema.parse(await res.json()));
      })
      .catch((err) => {
        // 404など
      });
  }, [params]);

  // ここに行くボタンを押したときの処理
  const handleChooseDishClick = async () => {
    const visitLogPayload: VisitRegisterRequest = {
      dishId: dishData.id,
      date: new Date(),
    };

    const res = await fetch(`/api/v-beta/user/visit/new`, {
      method: "POST",
      body: JSON.stringify(visitLogPayload),
    });

    // エラーが起きた場合どうするか？
    // 現在: エラーが起きても、とりあえず次のページに遷移する→履歴が登録されない
    // ゆくゆく: エラーが起きたら、「記録できませんでした」「もう一度試す」「記録せずナビを表示する」を表示する

    router.push(`/restaurant/${dishData.restaurant.id}/navi`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <BackButton title="戻る" />
      </div>
      <div className={styles.content}>
        <Card image={`/test/${dishData.id}.webp`} alt={dishData.name}>
          <p>{dishData.name}</p>
          <p>{dishData.restaurant.name}</p>
        </Card>
        <ExpandablePanel
          title="店舗詳細"
          bgImage={`/test/${dishData.restaurant.id}.webp`}
          titleEx="決済方法"
          childrenEx={<PaymentLong payments={dishData.restaurant.payments} />}
        >
          <ul className="grid justify-items-start gap-3">
            <li>
              <span>
                全日：
                {dishData.restaurant.restaurantOpens[99999999].timeOpen.toLocaleTimeString(
                  "ja-JP",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
                ～
                {dishData.restaurant.restaurantOpens[99999999].timeOpen.toLocaleTimeString(
                  "ja-JP",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </span>
            </li>
            <li className="grid">
              <span>滞在時間：おおよそ{Math.floor(dishData.eatTime / 60)}分</span>
              <small className="text-xs">※混雑状況により異なります。</small>
            </li>
            <li>
              <span>片道：おおよそ{Math.floor(dishData.restaurant.travelTime / 60)}分</span>
            </li>
          </ul>
        </ExpandablePanel>
      </div>
      <div className={styles.footer}>
        <div className={styles.button}>
          <RectButton color="blue" onClick={handleChooseDishClick}>
            ここに行く
          </RectButton>
        </div>
      </div>
    </div>
  );
}
