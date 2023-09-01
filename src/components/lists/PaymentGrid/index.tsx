import Cancel from "@icons/cancel.svg";
import Check from "@icons/check.svg";

type PaymentGridProps = {
  payment: string;
  accepted: boolean;
};

export function PaymentGrid({ payments }: { payments: PaymentGridProps[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
      {payments.map((item) => (
        <li key={item.payment} className="grid grid-cols-4 justify-items-center gap-1">
          <span className="col-span-3">{item.payment}</span>
          {item.accepted ? (
            <span className="text-green-600">
              <Check />
            </span>
          ) : (
            <span className="text-red-600">
              <Cancel />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
