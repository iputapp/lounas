import Image from "next/image";

import styles from "./styles.module.scss";

type CardfullProps = {
  explanation: string;
  supplement: string;
  thumbnail: string;
  icon: string;
  explanationStyle?: React.CSSProperties; // 新しいプロパティ
  supplementStyle?: React.CSSProperties; // 新しいプロパティ
};

export function Cardfull({
  explanation,
  supplement,
  thumbnail,
  icon,
  explanationStyle, // 新しいプロパティ
  supplementStyle, // 新しいプロパティ
}: CardfullProps) {
  return (
    <div className={styles.container}>
      <div className={styles.thumbnailContainer}>
        <Image
          src={thumbnail}
          alt={explanation}
          layout="fill"
          objectFit="cover"
          className={styles.thumbnailImage}
        />
      </div>
      <div className={styles.rightRectangle}>
        <Image src={icon} alt="icon" width={24} height={24} />
      </div>
      <section className={styles.descriptionSection}>
        <p className={styles.explanationSection} style={explanationStyle}>
          {explanation}
        </p>
        <p className={styles.supplementSection} style={supplementStyle}>
          {supplement}
        </p>
      </section>
    </div>
  );
}

export default Cardfull;
