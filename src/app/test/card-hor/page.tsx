import { CardHorizontal } from "@/components/cards/CardHorizontal";
import { PaymentJugde } from "@/components/paymentJugde/PaymentJugde";

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
    <div className="mx-auto grid max-w-3xl grid-cols-1 gap-5 p-4 md:grid-cols-2">
      <CardHorizontal
        title="赤味噌油そば"
        image="/test/oilnoodle.jpg"
        tag={1}
        description={<PaymentJugde paymentMethods={paymentMethods[0]} />}
      />
      <CardHorizontal
        title="赤味噌油そば"
        image="/test/oilnoodle.jpg"
        tag={2}
        description={<PaymentJugde paymentMethods={paymentMethods[1]} />}
      />
      <CardHorizontal
        title="赤味噌油そば"
        image="/test/oilnoodle.jpg"
        tag={3}
        description={<PaymentJugde paymentMethods={paymentMethods[0]} />}
      />
      <CardHorizontal
        title="赤味噌油そば"
        image="/test/oilnoodle.jpg"
        tag={4}
        description={<PaymentJugde paymentMethods={paymentMethods[1]} />}
      />
    </div>
  );
}
