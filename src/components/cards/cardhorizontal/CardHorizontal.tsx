import Image from "next/image";
import Link from "next/link";
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
    <Link href="" className={`${styles.cardContent} ${styles.neumorphism}`}>
      <div className={styles.cardImg}>
        <Image
          className={styles.cardImgThumbnail}
          src="/test/oilnoodle.jpg"
          width={256}
          height={256}
          sizes="100vw"
          alt={foodName}
        />
      </div>
      <div className={styles.cardDescription}>
        <h3 className="text-left">{foodName}</h3>
        <div className="text-sm">
          <p>決済方法:</p>
          <PaymentJugde paymentMethods={paymentMethods} />
        </div>
      </div>
      <div className={styles.cardNumber}>
        <div className={styles.cardNumberText}>1</div>
      </div>
    </Link>
  );
}
