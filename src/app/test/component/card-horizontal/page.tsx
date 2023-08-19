import React from "react";

import { CardHorizontal } from "@/components/cards/CardHorizontal";

export default function Test() {
  return (
    <div className="flex items-center w-full justify-center">
      <div className="grid grid-cols-1 w-96 content-center items-center justify-center">
        <CardHorizontal
          foodName="赤味噌油そば"
          paymentMethods={[
            { payment: "現金", accepted: true },
            { payment: "PayPay", accepted: false },
            { payment: "交通系IC", accepted: false },
          ]}
        />
        <CardHorizontal
          foodName="赤味噌油そば"
          paymentMethods={[
            { payment: "現金", accepted: true },
            { payment: "PayPay", accepted: false },
            { payment: "交通系IC", accepted: false },
          ]}
        />
        <CardHorizontal
          foodName="赤味噌油そば"
          paymentMethods={[
            { payment: "現金", accepted: true },
            { payment: "PayPay", accepted: false },
            { payment: "交通系IC", accepted: false },
          ]}
        />
        <CardHorizontal
          foodName="赤味噌油そば"
          paymentMethods={[
            { payment: "現金", accepted: true },
            { payment: "PayPay", accepted: false },
            { payment: "交通系IC", accepted: false },
          ]}
        />
        <CardHorizontal
          foodName="赤味噌油そば"
          paymentMethods={[
            { payment: "現金", accepted: true },
            { payment: "PayPay", accepted: false },
            { payment: "交通系IC", accepted: false },
          ]}
        />
      </div>
    </div>
  );
}
