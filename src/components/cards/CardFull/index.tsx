import LocationOn from "@icons/location-on.svg";
import Straight from "@icons/straight.svg";
import TurnLeft from "@icons/turn-left.svg";
import TurnRight from "@icons/turn-right.svg";
import TurnSharpLeft from "@icons/turn-sharp-left.svg";
import TurnSharpRight from "@icons/turn-sharp-right.svg";
import TurnSlightLeft from "@icons/turn-slight-left.svg";
import TurnSlightRight from "@icons/turn-slight-right.svg";
import Image from "next/image";

import styles from "./styles.module.scss";

type CardFullProps = {
  image: string;
  description: string;
  navigation:
    | "straight"
    | "left"
    | "right"
    | "sharpLeft"
    | "sharpRight"
    | "slightLeft"
    | "slightRight"
    | "pin";
};

export function CardFull({ image, description, navigation }: CardFullProps) {
  const navigationIcons = {
    straight: <Straight />,
    left: <TurnLeft />,
    right: <TurnRight />,
    sharpLeft: <TurnSharpLeft />,
    sharpRight: <TurnSharpRight />,
    slightLeft: <TurnSlightLeft />,
    slightRight: <TurnSlightRight />,
    pin: <LocationOn />,
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageParent}>
        <Image
          className={styles.image}
          src={image}
          alt={description}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          priority
        />
        <section className={styles.description}>
          <p>{description}</p>
        </section>
      </div>
      <div className={styles.tag}>
        <span>{navigationIcons[navigation]}</span>
      </div>
    </article>
  );
}
