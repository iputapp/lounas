import Cancel from "@icons/cancel.svg";
import Check from "@icons/check.svg";

type paymentMethod = {
  payment: string;
  accepted: boolean;
};

export function PaymentJugde({ paymentMethods }: { paymentMethods: paymentMethod[] }) {
  return (
    <div className="flex items-center justify-end">
      <ul className="w-fit">
        {paymentMethods.map((item) => (
          <li key={item.payment}>
            <div className="flex items-center justify-end space-x-2">
              <span>{item.payment}</span>
              {item.accepted ? (
                <span className="text-green-600">
                  <Check />
                </span>
              ) : (
                <span className="text-red-600">
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
