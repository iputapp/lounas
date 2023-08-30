import CheckCircle from "@icons/check-circle.svg";
import DeleteCircle from "@icons/delete-circle.svg";
import React from "react";

type paymentMethod = {
  payment: string;
  accepted: boolean;
};

export function PaymentJugde({ paymentMethods }: { paymentMethods: paymentMethod[] }) {
  return (
    <ul className="w-fit">
      {paymentMethods.map((item) => (
        <li key={item.payment}>
          <div className="flex items-center justify-between space-x-4">
            <span>{item.payment}</span>
            <span>{item.accepted ? <CheckCircle /> : <DeleteCircle />}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
