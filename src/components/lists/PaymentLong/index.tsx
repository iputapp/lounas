/** payment method  */
export type PaymentType = "cash" | "credit" | "qr" | "transport";

type PaymentLongProps = {
  type: PaymentType;
  accepted: boolean;
  details: string | null;
};

export function PaymentLong({ payments }: { payments: PaymentLongProps[] }) {
  const getPaymentName = (type: PaymentType) => {
    switch (type) {
      case "cash":
        return "現金";
      case "credit":
        return "クレジットカード";
      case "qr":
        return "QRコード決済";
      case "transport":
        return "交通系";
      default:
        return "その他";
    }
  };

  return (
    <ul className="grid w-full grid-cols-2 justify-items-start gap-2">
      {payments.map((item) => (
        <li key={item.type}>
          {item.accepted && (
            <div className="grid justify-items-start text-sm">
              <div>
                <span>・</span>
                <span>{getPaymentName(item.type)}</span>
              </div>
              <div className="ms-3.5">
                <small>{item.details ?? ""}</small>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
