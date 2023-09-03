import { CardHorizontal } from "@/components/cards/CardHorizontal";
import { Payment } from "@/components/lists/Payment";

export default function Test() {
  const paymentMethods = [
    [
      { payment: "現金", accepted: true },
      { payment: "PayPay", accepted: false },
      { payment: "交通系IC", accepted: false },
    ],
    [
      { payment: "現金", accepted: true },
      { payment: "PayPay", accepted: true },
      { payment: "Rakuten Pay", accepted: false },
      { payment: "交通系IC", accepted: true },
    ],
  ];

  return (
    <div className="mx-auto grid max-w-3xl grid-cols-1 gap-5 p-6 md:grid-cols-2">
      <CardHorizontal
        title="赤味噌油そば"
        image="/test/ramen.webp"
        tag={1}
        description={<Payment payments={paymentMethods[0]} />}
      />
      <CardHorizontal
        title="赤味噌油そば"
        image="/test/ramen.webp"
        tag={2}
        description={<Payment payments={paymentMethods[1]} />}
      />
      <CardHorizontal
        title="赤味噌油そば"
        image="/test/ramen.webp"
        tag={3}
        description={<Payment payments={paymentMethods[0]} />}
      />
      <CardHorizontal
        title="赤味噌油そば"
        image="/test/ramen.webp"
        tag={4}
        description={<Payment payments={paymentMethods[1]} />}
      />
      <CardHorizontal
        title="赤味噌油そば"
        image="/test/ramen.webp"
        description={<Payment payments={paymentMethods[1]} />}
      />
    </div>
  );
}
