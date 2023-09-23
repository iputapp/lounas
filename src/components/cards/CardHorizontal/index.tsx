import Image from "next/image";
import Link from "next/link";

import styles from "./styles.module.scss";

type CardHorizontalProps = {
  url: string;
  title: string;
  image: string;
  tag?: number | string;
  description?: React.ReactNode;
};

export function CardHorizontal({ url, title, image, tag, description }: CardHorizontalProps) {
  return (
    <Link href={url} className={styles.card}>
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
      <section className={styles.content}>
        <div className={styles.title}>
          <span>{title}</span>
        </div>
        <section className={styles.description}>{description}</section>
      </section>
      <div className={tag ? styles.tag : ""}>
        <span>{tag?.toString()}</span>
      </div>
    </Link>
  );
}
