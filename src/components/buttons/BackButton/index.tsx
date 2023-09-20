"use client";

import ArrowSemibold from "@icons/nav-arrow-left-semibold.svg";
import { useRouter } from "next/navigation";

import styles from "./styles.module.scss";

type BackButtonProps = {
  title?: React.ReactNode;
  className?: string;
};

export function BackButton({ title = "", className = "" }: BackButtonProps) {
  const router = useRouter();

  return (
    <button className={`${styles.button} ${className}`} type="button" onClick={() => router.back()}>
      <span className={styles.icon}>
        <ArrowSemibold />
      </span>
      <span>{title}</span>
    </button>
  );
}
