"use client";

import Cancel from "@icons/cancel.svg";
import Enlarge from "@icons/enlarge.svg";
import { useState } from "react";

import styles from "./styles.module.scss";

type ExpandablePanelProps = {
  children: React.ReactNode;
  title: string;
  childrenEx?: React.ReactNode;
  titleEx?: string;
};

export function ExpandablePanel({ children, title, childrenEx, titleEx }: ExpandablePanelProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button className={expanded ? `${styles.backdrop}` : ""} onClick={() => setExpanded(!expanded)}>
      <div className={`${styles.container} ${expanded ? styles.expanded : ""}`}>
        <div className={styles.content}>
          <div className={`${styles.overview} ${expanded ? styles.expanded : ""}`}>
            <h2 className={`${styles.title} ${expanded ? styles.expanded : ""}`}>{title}</h2>
            {children}
          </div>
          <div className={`${styles.details} ${expanded ? styles.expanded : ""}`}>
            <h2 className={styles.title}>{titleEx}</h2>
            {childrenEx}
          </div>
        </div>
        <span>{expanded ? <Cancel /> : <Enlarge />}</span>
      </div>
    </button>
  );
}
