import CheckCircle from "@icons/check-circle.svg";
import DeleteCircle from "@icons/delete-circle.svg";
import React from "react";

export function PaymentJugde(props) {
  return (
    <>
      <ul className="text-xs">
        {props.map((item) => (
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
