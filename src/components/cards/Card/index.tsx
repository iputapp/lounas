import Image from "next/image";

import styles from "./styles.module.scss";

type CardProps = {
  children: React.ReactNode;
  image: string;
  alt: string;
};

export function Card({ children, image, alt }: CardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageParent}>
        <Image
          className={styles.image}
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          priority
        />
      </div>
      <section className={styles.content}>
        <p className={styles.title}>{children}</p>
      </section>
    </article>
  );
}
