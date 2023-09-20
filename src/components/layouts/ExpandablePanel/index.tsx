"use client";

import Cancel from "@icons/cancel.svg";
import Expand from "@icons/expand.svg";
import { useState } from "react";

import styles from "./styles.module.scss";

type ExpandablePanelProps = {
  children: React.ReactNode;
  title: string;
  showTitle?: boolean;
  childrenEx?: React.ReactNode;
  titleEx?: string;
};

export function ExpandablePanel({
  children,
  title,
  showTitle = false,
  childrenEx,
  titleEx,
}: ExpandablePanelProps) {
  const [expanded, setExpanded] = useState(false);

  const expand = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <>
      {/* overview panel */}
      <button className={`${styles.overview} ${styles.panel}`} onClick={expand}>
        <div className={styles.content}>
          {showTitle && <span className={styles.title}>{title}</span>}
          <section className={styles.description}>{children}</section>
        </div>
        <span>{expanded ? <Cancel /> : <Expand />}</span>
      </button>
      {/* expanded panel */}
      <button className={`${styles.full} ${expanded ? styles.expanded : ""}`} onClick={expand}>
        <div className={`${styles.panel} ${expanded ? styles.expanded : ""}`}>
          <div className={styles.content}>
            <section>
              <span className={styles.title}>{title}</span>
              <div className={styles.description}>{children}</div>
            </section>
            <section>
              <span className={styles.title}>{titleEx}</span>
              <div className={styles.description}>{childrenEx}</div>
            </section>
          </div>
          <span>{expanded ? <Cancel /> : <Expand />}</span>
        </div>
      </button>
    </>
  );
}
