"use client";

import ArrowSemibold from "@icons/nav-arrow-left-semibold.svg";
import { useRouter } from "next/navigation";

import styles from "./styles.module.scss";

export function BackButton() {
  const router = useRouter();

  return (
    <button className={styles.button} type="button" onClick={() => router.back()}>
      <span>
        <ArrowSemibold />
      </span>
      <span>戻る</span>
    </button>
  );
}
