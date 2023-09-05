"use client";

import { RectButton } from "@/components/buttons/RectButton";
import { CardHorizontal } from "@/components/cards/CardHorizontal";
import { Payment } from "@/components/lists/Payment";

export default function RecommendedResult() {
  const payments = [
    { payment: "クレジットカード", accepted: true },
    { payment: "電子マネー", accepted: true },
    { payment: "QRコード", accepted: false },
  ];
  const cancel = () => {
    console.log("キャンセルよ");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center justify-center gap-4">
        <CardHorizontal
          title="かつ丼"
          tag={1}
          image="/かつ丼.jpg"
          description={<Payment payments={payments} />}
        />
        <CardHorizontal
          title="かつ丼"
          tag={1}
          image="/かつ丼.jpg"
          description={<Payment payments={payments} />}
        />
        <CardHorizontal
          title="かつ丼"
          tag={1}
          image="/かつ丼.jpg"
          description={<Payment payments={payments} />}
        />
      </div>
      <RectButton text="キャンセル" color="red" onClick={cancel} />
    </div>
  );
}