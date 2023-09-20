"use client";

import { useRouter } from "next/navigation";

import { RectButton } from "@/components/buttons/RectButton";
import { CardHorizontal } from "@/components/cards/CardHorizontal";
import { PaymentShort, PaymentType } from "@/components/lists/PaymentShort";

import styles from "./page.module.scss";

export default function RecommendedResult() {
  const router = useRouter();

  /** テスト用 支払方法 */
  const payments = [
    { payment: "cash" as PaymentType, accepted: true },
    { payment: "credit" as PaymentType, accepted: true },
    { payment: "transport" as PaymentType, accepted: true },
    { payment: "qr" as PaymentType, accepted: false },
  ];

  const cancel = () => {
    router.replace("/webapp/home");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>あなたへのおすすめ</h1>
      </div>
      <div className={styles.content}>
        <CardHorizontal
          url="/"
          title="かつ丼"
          tag={1}
          image="/test/ramen.webp"
          description={<PaymentShort payments={payments} />}
        />
        <CardHorizontal
          url="/"
          title="かつ丼"
          tag={2}
          image="/test/ramen.webp"
          description={<PaymentShort payments={payments} />}
        />
        <CardHorizontal
          url="/"
          title="かつ丼"
          tag={3}
          image="/test/ramen.webp"
          description={<PaymentShort payments={payments} />}
        />
        <CardHorizontal
          url="/"
          title="かつ丼"
          tag={4}
          image="/test/ramen.webp"
          description={<PaymentShort payments={payments} />}
        />
        <CardHorizontal
          url="/"
          title="かつ丼"
          tag={5}
          image="/test/ramen.webp"
          description={<PaymentShort payments={payments} />}
        />
      </div>
      <div className={styles.footer}>
        <div className={styles.button}>
          <RectButton color="red" onClick={cancel}>
            キャンセル
          </RectButton>
        </div>
      </div>
    </div>
  );
}
