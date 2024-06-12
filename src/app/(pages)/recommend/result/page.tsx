import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { RecommendResponseF } from "@/app/api/v-beta/recommend";
import { RectButton } from "@/components/buttons/RectButton";
import { CardHorizontal } from "@/components/cards/CardHorizontal";
import { PaymentShort } from "@/components/lists/PaymentShort";

import styles from "./page.module.scss";

/** @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config} */
export const dynamic = "force-dynamic"; //動的に変更

async function getRecommend(params: URLSearchParams) { //URLSearchParamsを引数に取り、おすすめを取得する
  const recommends = (await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v-beta/recommend?${params.toString()}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json()) //成功した場合にjsonを返す
    .catch((err) => { //失敗した場合にエラーを返す
      console.error(err);
      return notFound();
    })) as RecommendResponseF[];

  return recommends;
}

/** @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional} */
export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const params = new URLSearchParams(searchParams as Record<string, string>);
  /** おすすめ */
  const recommends = await getRecommend(params);

  /** 支払方法 */
  // const payments = recommends.map((item) => {
  //   return item.restaurant.payments.map((payment) => ({
  //     type: payment.paymentType.name as PaymentType,
  //     accepted: payment.accepted,
  //   }));
  // });
  // const sortedPayments = payments.map((payment) =>
  //   payment.sort((a, b) => a.type.localeCompare(b.type))
  // );

  /** @see {@link https://nextjs.org/docs/app/api-reference/functions/revalidatePath} */
  revalidatePath("/recommend/result", "page");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>あなたへのおすすめ</h1>
      </div>
      {recommends.length ? ( //recpmmendsが空ではない場合
        <div className={styles.content}>
          {recommends.map((recommend, index) => ( //数分CardHorizontalを表示
            <CardHorizontal
              key={recommend.dish.id}
              url={`/dish/${recommend.dish.id}`}
              title={recommend.dish.name}
              tag={index + 1}
              image={`dishes/id/${recommend.dish.id}.webp`}
              description={<PaymentShort payments={recommend.restaurant.payments} />}
            />
          ))}
        </div>
      ) : (
        <div className={styles.zero}>
          <div className={styles.head}>
            <span className={styles.title}>検索結果: 0件</span>
            <div className={styles.description}>
              <span>ご希望に沿う料理は見つかりませんでした...</span>
              <span>💡 営業中のお店のみ表示しております 💡</span>
              <span>
                {new Date().toLocaleString("ja-JP", {
                  timeZone: "Asia/Tokyo",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  weekday: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </span>
            </div>
            <div className={styles.parent}>
              <Image
                src="/images/not-found-penguin.webp"
                alt="not-found-penguin"
                fill
                sizes="(max-width: 768px) 75vw, (max-width: 1200px) 75vw, 75vw"
                priority
              />
            </div>
          </div>
          <Link className={styles.retry} href="/recommend/explore" replace>
            もう一度検索する
          </Link>
        </div>
      )}
      <div className={styles.footer}>
        <div className={styles.button}>
          <RectButton color="red">
            <Link href="/webapp/home" replace>
              ホームへ戻る
            </Link>
          </RectButton>
        </div>
      </div>
    </div>
  );
}
