"use client";

import Cancel from "@icons/cancel.svg";
import Enlarge from "@icons/enlarge.svg";
import { useState } from "react";

import styles from "./styles.module.scss";

type ExpandablePanelProps = {
  children: React.ReactNode;
  expandChildren?: React.ReactNode;
};

export function ExpandablePanel({ children, expandChildren }: ExpandablePanelProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button className={`${expanded ? styles.backdrop : ""}`} onClick={() => setExpanded(!expanded)}>
      <div className={`${styles.container} ${expanded ? styles.expanded : ""}`}>
        <div className={styles.content}>
          <div>{children}</div>
          {expanded && <div>{expandChildren}</div>}
        </div>
        <span>{expanded ? <Cancel /> : <Enlarge />}</span>
      </div>
    </button>
  );
}
