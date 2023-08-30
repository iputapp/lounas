import Image from "next/image";
import Link from "next/link";
import React from "react";

import styles from "./cardhorizontal.module.scss";

type CardHorizontalProps = {
  title: string;
  image: string;
  tag: number | string;
  description?: React.ReactNode;
};

export function CardHorizontal({ title, image, tag, description }: CardHorizontalProps) {
  return (
    <Link href="/" className={styles.cardContainer}>
      <div className={styles.cardImageParent}>
        <Image
          className={styles.cardImage}
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          priority
        />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <div className={styles.cardDescription}>{description}</div>
      </div>
      <div className={styles.cardNumber}>
        <span className={styles.cardNumberText}>{tag.toString()}</span>
      </div>
    </Link>
  );
}
