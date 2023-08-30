import Cancel from "@icons/cancel.svg";
import Check from "@icons/check.svg";

type PaymentProps = {
  payment: string;
  accepted: boolean;
};

export function Payment({ payments }: { payments: PaymentProps[] }) {
  return (
    <div className="flex items-center justify-end">
      <ul className="w-fit">
        {payments.map((item) => (
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
