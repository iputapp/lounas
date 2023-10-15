import Cancel from "@icons/cancel.svg";
import Check from "@icons/check.svg";

/** payment method  */
export type PaymentType = "cash" | "credit" | "qr" | "transport";

type PaymentShortProps = {
  type: PaymentType;
  accepted: boolean;
};

export function PaymentShort({ payments }: { payments: PaymentShortProps[] }) {
  const getPaymentName = (type: PaymentType) => {
    switch (type) {
      case "cash":
        return "現金";
      case "credit":
        return "カード";
      case "qr":
        return "QRコード";
      case "transport":
        return "交通系";
      default:
        return "その他";
    }
  };

  return (
    <div className="flex items-center justify-end">
      <ul className="w-fit">
        {payments.map((item) => (
          <li key={item.type} className="flex items-center justify-end space-x-1">
            <small>{getPaymentName(item.type)}</small>
            {item.accepted ? (
              <small className="text-green-600">
                <Check />
              </small>
            ) : (
              <small className="mt-px text-red-600">
                <Cancel />
              </small>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
