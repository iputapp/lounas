import { RectButton } from "@/components/buttons/RectButton";
import { BorderTitle } from "@/components/headers/BorderTitle";
import { BasicSkeleton } from "@/components/skeletons/BasicSkeleton";

import styles from "./styles.module.scss";

type DishListSuspenseProps = {
  messageLine1: string;
  messageLine2: string;
  cancelButtonText: string;
};

export function DishListSuspense({
  messageLine1,
  messageLine2,
  cancelButtonText,
}: DishListSuspenseProps) {
  return (
    <div className={styles.container}>
      <BorderTitle
        fontSize="text-3xl"
        boderPadding="py-5"
        lineHeight="leading-normal"
        className={styles.title}
      >
        <h1>
          <span>{messageLine1}</span>
          <span>{messageLine2}</span>
        </h1>
      </BorderTitle>
      <div className={styles.skeleton}>
        <BasicSkeleton />
        <BasicSkeleton delay={1} />
      </div>
      <div className={styles.button}>
        <RectButton color="red">{cancelButtonText}</RectButton>
      </div>
    </div>
  );
}
