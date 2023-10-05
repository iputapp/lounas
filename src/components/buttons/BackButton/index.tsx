"use client";

import NavArrowLeftSemibold from "@icons/nav-arrow-left-semibold.svg";
import { useRouter } from "next/navigation";

import styles from "./styles.module.scss";

type BackButtonProps = {
  title?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function BackButton({ title = "", className = "", onClick }: BackButtonProps) {
  const router = useRouter();

  onClick = onClick ?? (() => router.back());

  return (
    <button className={`${styles.button} ${className}`} type="button" onClick={onClick}>
      <span className={styles.icon}>
        <NavArrowLeftSemibold />
      </span>
      <span>{title}</span>
    </button>
  );
}
