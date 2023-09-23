/** payment method  */
export type PaymentType = "cash" | "credit" | "qr" | "transport";

type PaymentLongProps = {
  payment: PaymentType;
  accepted: boolean;
};

export function PaymentLong({ payments }: { payments: PaymentLongProps[] }) {
  const getPaymentName = (payment: PaymentType) => {
    switch (payment) {
      case "cash":
        return "現金";
      case "credit":
        return "クレジットカード";
      case "qr":
        return "QRコード決済";
      case "transport":
        return "交通系";
    }
  };

  const getPaymentDetails = (payment: PaymentType) => {
    switch (payment) {
      case "cash":
        return "";
      case "credit":
        return "Mastercard, Visa";
      case "qr":
        return "PayPay";
      case "transport":
        return "Suica, PASMO, etc.";
    }
  };

  return (
    <ul className="grid w-full grid-cols-2 justify-items-start gap-2">
      {payments.map((item) => (
        <li key={item.payment}>
          {item.accepted && (
            <div className="grid justify-items-start text-sm">
              <div>
                <span>・</span>
                <span>{getPaymentName(item.payment)}</span>
              </div>
              <div className="ms-3.5">
                <small>{getPaymentDetails(item.payment)}</small>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
