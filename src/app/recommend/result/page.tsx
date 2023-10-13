import Link from "next/link";

// import { notFound } from "next/navigation";
import { RecommendResponse } from "@/app/api/v-beta/recommend";
import { RectButton } from "@/components/buttons/RectButton";
import { CardHorizontal } from "@/components/cards/CardHorizontal";
import { PaymentShort } from "@/components/lists/PaymentShort";

import styles from "./page.module.scss";

/** @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config} */
export const dynamic = "force-dynamic"; // SSR

async function getRecommend(params: URLSearchParams) {
  const recommends = (await fetch(
    `${process.env.BASE_URL}/api/v-beta/recommend?${params.toString()}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      // return notFound();
    })) as RecommendResponse[];

  return recommends;
}

/** @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional} */
export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // const searchParams = useSearchParams();
  // const [recommends, setRecommends] = useState<RecommendResponse[]>([]);

  // useEffect(() => {
  //   const currentParams = new URLSearchParams(Array.from(searchParams.entries())); // all current params
  //   console.log(currentParams.toString());
  //   /** fetch recommend */
  //   (async () => {
  //     const result = await getRecommend(searchParams);
  //     /** @todo timer and redirect to result page??? */
  //     console.log(result);
  //     setRecommends(result);
  //   })().catch((err) => {
  //     console.error(err);
  //   });
  // }, [searchParams]);

  const params = new URLSearchParams(searchParams as Record<string, string>);
  console.log(params.toString());
  /** おすすめ */
  const recommends = await getRecommend(params);

  /** 支払方法 */
  // const payments = recommends.map((item) => {
  //   return item.restaurant.payments.map((payment) => ({
  //     type: payment.paymentType.name as PaymentType,
  //     accepted: payment.accepted,
  //   }));
  // });
  // const sortedPayments = payments.sort((a, b) => a.type.localeCompare(b.type));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>あなたへのおすすめ</h1>
      </div>
      <div className={styles.content}>
        {recommends.map((recommend, index) => (
          <CardHorizontal
            key={recommend.id}
            url={`/dish/${recommend.id}`}
            title={recommend.name}
            tag={index + 1}
            image={`/${recommend.id}.webp`}
            description={<PaymentShort payments={recommend.restaurant.payments} />}
          />
        ))}
      </div>
      <div className={styles.footer}>
        <div className={styles.button}>
          <RectButton color="red">
            <Link href="/webapp/home" replace>
              キャンセル
            </Link>
          </RectButton>
        </div>
      </div>
    </div>
  );
}
