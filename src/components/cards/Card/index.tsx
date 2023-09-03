import Image from "next/image";

import styles from "./styles.module.scss";

type CardProps = {
  title: string;
  image: string;
};

export function Card({ title, image }: CardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageParent}>
        <Image
          className={styles.image}
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          priority
        />
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
      </div>
    </article>
  );
}
