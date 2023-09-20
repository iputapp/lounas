"use client";

import Cancel from "@icons/cancel.svg";

import styles from "./styles.module.scss";

type ExpandablePanelProps = {
  children: React.ReactNode;
  title: string;
  childrenEx?: React.ReactNode;
  titleEx?: string;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ExpandablePanel({
  children,
  title,
  childrenEx,
  titleEx,
  expanded,
  setExpanded,
}: ExpandablePanelProps) {
  return (
    <button
      className={expanded ? `${styles.backdrop}` : "hidden"}
      onClick={() => setExpanded(!expanded)}
    >
      <div className={`${styles.container} ${styles.expanded}`}>
        <div className={styles.content}>
          <div className={`${styles.overview} ${styles.expanded}`}>
            <h2 className={`${styles.title} ${styles.expanded}`}>{title}</h2>
            {children}
          </div>
          <div className={`${styles.details} ${styles.expanded}`}>
            <h2 className={styles.title}>{titleEx}</h2>
            {childrenEx}
          </div>
        </div>
        <Cancel />
      </div>
    </button>
  );
}
