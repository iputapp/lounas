"use client";

import NavArrowLeftSemibold from "@icons/nav-arrow-left-semibold.svg";
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
        <NavArrowLeftSemibold />
      </span>
      <span>{title}</span>
    </button>
  );
}
