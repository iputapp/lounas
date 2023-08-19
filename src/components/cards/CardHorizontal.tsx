import Image from "next/image";
import React from "react";

import { PaymentJugde } from "@/components/paymentJugde/PaymentJugde";

type paymentMethod = {
  payment: string;
  accepted: boolean;
};

export function CardHorizontal({
  paymentMethods,
  foodName,
}: {
  paymentMethods: paymentMethod[];
  foodName: string;
}) {
  return (
    <div className="flex w-full h-32 rounded-2xl justify-between mb-4">
      <div className="relative w-36">
        <Image
          className="absolute h-full object-cover rounded-2xl"
          src="/test/oilnoodle.jpg"
          width={256}
          height={256}
          sizes="100vw"
          alt={foodName}
        />
      </div>
      <div className="p-2 flex-auto flex-col space-y-2">
        <h3 className="text-left">{foodName}</h3>
        <div className="text-sm">
          <p>決済方法:</p>
          <PaymentJugde paymentMethods={paymentMethods} />
        </div>
      </div>
      <div className="px-1 flex items-center justify-center bg-blue-600 rounded-e-2xl">
        <div className="text-2xl font-bold text-white">1</div>
      </div>
    </div>
  );
}
