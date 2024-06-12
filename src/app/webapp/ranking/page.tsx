import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DishesList } from "@/app/api/v-beta/dishes";
import { CardHorizontal } from "@/components/cards/CardHorizontal";
import { PaymentShort } from "@/components/lists/PaymentShort";

import styles from "./page.module.scss";

async function getAllDishes():Promise<DishesList[]> {
  const dishes = (await fetch(
    `${process.env.Next_PUBLIC_BASE_URL}/api/v-beta/dishes`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return notFound();
    })) as DishesList;

  return dishes;
}

export default async function Page() {

  const dishes = await getAllDishes();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>料理一覧</h1>
      </div>
      {dishes.length ? (
        <div className={styles.content}>
          {dishes.map((dish) => (
            <CardHorizontal
              key={dish.id}
              url={`/dish/${dish.id}`}
              title={dish.name}
              image={`dishes/id/${dish.id}.webp`}
              description={
                dish.restaurant && dish.restaurant.payments ? (
                  <PaymentShort payments={dish.restaurant.payments} />
                ) : (
                  "支払い情報がありません"
                )
              }
            />
          ))}
        </div>
      ) : (
        <p>料理が見つかりませんでした。</p>
      )}
    </div>
  );
}
