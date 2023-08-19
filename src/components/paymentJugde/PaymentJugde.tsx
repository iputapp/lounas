import CheckCircle from "@icons/check-circle.svg";
import DeleteCircle from "@icons/delete-circle.svg";
import React from "react";

type paymentMethod = {
  payment: string;
  accepted: boolean;
};

export function PaymentJugde({ paymentMethods }: { paymentMethods: paymentMethod[] }) {
  return (
    <>
      <ul className="text-xs">
        {paymentMethods.map((item) => (
          <li key={item.payment}>
            <div className="flex justify-between">
              <span>{item.payment}</span>
              <span>{item.accepted ? <CheckCircle /> : <DeleteCircle />}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
