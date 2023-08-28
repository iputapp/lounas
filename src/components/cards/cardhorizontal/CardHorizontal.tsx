import Image from "next/image";
import React from "react";

import { PaymentJugde } from "@/components/paymentJugde/PaymentJugde";

import styles from "./cardhorizontal.module.scss";

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
    <div className={`${styles['card-content']} ${styles.neumorphism}`}>
      <div className={styles['card-img']}>
        <Image
          className={styles['card-img-thumbnail']}
          src="/test/oilnoodle.jpg"
          width={256}
          height={256}
          sizes="100vw"
          alt={foodName}
        />
      </div>
      <div className={styles['card-description']}>
        <h3 className="text-left">{foodName}</h3>
        <div className="text-sm">
          <p>決済方法:</p>
          <PaymentJugde paymentMethods={paymentMethods} />
        </div>
      </div>
      <div className={styles['card-number']}>
        <div className={styles['card-number-text']}>1</div>
      </div>
    </div>
  );
}
