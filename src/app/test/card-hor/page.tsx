import { CardHorizontal } from "@/components/cards/CardHorizontal";
import { PaymentShort, PaymentType } from "@/components/lists/PaymentShort";

export default function Test() {
  const payments = [
    { payment: "cash" as PaymentType, accepted: true },
    { payment: "credit" as PaymentType, accepted: true },
    { payment: "qr" as PaymentType, accepted: false },
    { payment: "transport" as PaymentType, accepted: true },
  ];

  return (
    <div className="mx-auto grid max-w-3xl grid-cols-1 gap-5 p-6 md:grid-cols-2">
      <CardHorizontal
        url="/"
        title="赤味噌油そば"
        image="/test/ramen.webp"
        tag={1}
        description={<PaymentShort payments={payments} />}
      />
      <CardHorizontal
        url="/"
        title="赤味噌油そば"
        image="/test/ramen.webp"
        tag={2}
        description={<PaymentShort payments={payments} />}
      />
      <CardHorizontal
        url="/"
        title="赤味噌油そば"
        image="/test/ramen.webp"
        tag={3}
        description={<PaymentShort payments={payments} />}
      />
      <CardHorizontal
        url="/"
        title="赤味噌油そば"
        image="/test/ramen.webp"
        tag={4}
        description={<PaymentShort payments={payments} />}
      />
      <CardHorizontal url="/" title="赤味噌油そば" image="/test/ramen.webp" />
    </div>
  );
}
