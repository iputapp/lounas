import Image from "next/image";

import styles from "./styles.module.scss";

type CardProps = {
  image: string;
  title: string;
};

export function Card({ image, title }: CardProps) {
  return (
    <div className={styles.cardContainer}>
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
        <p className={styles.cardTitle}>{title}</p>
      </div>
    </div>
  );
}
