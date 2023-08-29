import Cancel from "@icons/cancel.svg";
import React, { Dispatch, SetStateAction, useEffect } from "react";

import styles from "@/styles/components/dialogs/dialoginfo.module.scss";

type DialogInfoProps = {
  header: string;
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function DialogInfo({ header, children, isOpen, setIsOpen }: DialogInfoProps) {
  const stopScrollingBackContent = () => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };
  useEffect(stopScrollingBackContent, [isOpen]);

  return (
    <div
      className={
        styles.screen +
        `${isOpen ? " visible" : " invisible"}` +
        `${isOpen ? "overflow-y-hidden" : ""}`
      }
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={() => setIsOpen(!isOpen)}>
            <Cancel />
          </button>
          <h1>
            <span>{header}</span>
          </h1>
        </div>
        <div className={styles.main}>{children}</div>
      </div>
    </div>
  );
}
