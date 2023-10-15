import Link from "next/link";
import { notFound } from "next/navigation";

import { RecommendResponse } from "@/app/api/v-beta/recommend";
import { RectButton } from "@/components/buttons/RectButton";
import { CardHorizontal } from "@/components/cards/CardHorizontal";
import { PaymentShort, PaymentType } from "@/components/lists/PaymentShort";

import styles from "./page.module.scss";

async function getRecommend(params: URLSearchParams) {
  const recommends = (await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v-beta/recommend?${params.toString()}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return notFound();
    })) as RecommendResponse[];

  return recommends;
}

/** @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional} */
export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const params = new URLSearchParams(searchParams as Record<string, string>);
  console.log(params.toString());
  /** おすすめ */
  const recommends = await getRecommend(params);

  /** 支払方法 */
  const payments = recommends.map((item) => {
    return item.restaurant.payments.map((payment) => ({
      type: payment.paymentType.name as PaymentType,
      accepted: payment.accepted,
    }));
  });
  // const sortedPayments = payments.sort((a, b) => a.type.localeCompare(b.type));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>あなたへのおすすめ</h1>
      </div>
      <div className={styles.content}>
        {recommends.length == 0 ? (
          <>
            <div className={styles.zero}>検索結果: 0件</div>
            <div className={styles.noresult}>
              ご希望に沿う料理は見つかりませんでした…
              <div className={styles.retry}>
                <Link href="/recommend/explore" replace>
                  もう一度検索する
                </Link>
              </div>
            </div>
          </>
        ) : (
          recommends.map((recommend, index) => (
            <CardHorizontal
              key={recommend.id}
              url={`/dish/${recommend.id}`}
              title={recommend.name}
              tag={index + 1}
              image={`/dish/id/${recommend.id}.webp`}
              description={<PaymentShort payments={payments[index]} />}
            />
          ))
        )}
      </div>
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
