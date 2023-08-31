"use client";

import Cancel from "@icons/cancel.svg";
import Expand from "@icons/expand.svg";
import { useState } from "react";

import styles from "./styles.module.scss";

type ExpandablePanelProps = {
  children: React.ReactNode;
  expandChildren?: React.ReactNode;
};

export function ExpandablePanel({ children, expandChildren }: ExpandablePanelProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`${expanded ? styles.backdrop : ""}`}>
      <div className={`${styles.container} ${expanded ? styles.expanded : ""}`}>
        <div className={styles.content}>
          <div>{children}</div>
          {expanded && <div className={styles.content}>{expandChildren}</div>}
        </div>
        <button className={styles.icon} onClick={() => setExpanded(!expanded)}>
          <span>{expanded ? <Cancel /> : <Expand />}</span>
        </button>
      </div>
    </div>
  );
}
