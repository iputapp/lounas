"use client";

import { useRouter } from "next/navigation";

import { RectButton } from "@/components/buttons/RectButton";
import { CardHorizontal } from "@/components/cards/CardHorizontal";
import { Payment } from "@/components/lists/Payment";

import styles from "./page.module.scss";

export default function RecommendedResult() {
  const payments = [
    { payment: "クレジットカード", accepted: true },
    { payment: "電子マネー", accepted: true },
    { payment: "QRコード", accepted: false },
  ];
  const router = useRouter();
  const cancel = () => {
    router.replace("/webapp/home");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>あなたへのおすすめ</h1>
      <div className={styles.main}>
        <CardHorizontal
          title="かつ丼"
          tag={1}
          image="/test/ramen.webp"
          description={<Payment payments={payments} />}
        />
        <CardHorizontal
          title="かつ丼"
          tag={2}
          image="/test/ramen.webp"
          description={<Payment payments={payments} />}
        />
        <CardHorizontal
          title="かつ丼"
          tag={3}
          image="/test/ramen.webp"
          description={<Payment payments={payments} />}
        />
        <CardHorizontal
          title="かつ丼"
          tag={4}
          image="/test/ramen.webp"
          description={<Payment payments={payments} />}
        />
        <CardHorizontal
          title="かつ丼"
          tag={5}
          image="/test/ramen.webp"
          description={<Payment payments={payments} />}
        />
      </div>
      <div className={styles.footer}>
        <RectButton color="red" onClick={cancel}>
          キャンセル
        </RectButton>
      </div>
    </div>
  );
}
