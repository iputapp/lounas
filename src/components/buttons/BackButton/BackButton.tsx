"use client";

import Arrow from "@icons/nav-arrow-left.svg";
import { useRouter } from "next/navigation";

import styles from "./styles.module.scss";

export function BackButton() {
  const router = useRouter();

  return (
    <div className={styles.main}>
      <button className={styles.button} type="button" onClick={() => router.back()}>
        <Arrow />
        <h1>
          <span>戻る</span>
        </h1>
      </button>
    </div>
  );
}
