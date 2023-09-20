import Cancel from "@icons/cancel.svg";
import Check from "@icons/check.svg";

/** payment method  */
export type PaymentType = "cash" | "credit" | "qr" | "transport";

type PaymentShortProps = {
  payment: PaymentType;
  accepted: boolean;
};

export function PaymentShort({ payments }: { payments: PaymentShortProps[] }) {
  const getPaymentName = (payment: PaymentType) => {
    switch (payment) {
      case "cash":
        return "現金";
      case "credit":
        return "カード";
      case "qr":
        return "QRコード";
      case "transport":
        return "交通系";
    }
  };

  return (
    <div className="flex items-center justify-end">
      <ul className="w-fit">
        {payments.map((item) => (
          <li key={item.payment}>
            <div className="flex items-center justify-end space-x-1">
              <span>{getPaymentName(item.payment)}</span>
              {item.accepted ? (
                <span className="text-green-600">
                  <Check />
                </span>
              ) : (
                <span className="mt-px text-red-600">
                  <Cancel />
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
