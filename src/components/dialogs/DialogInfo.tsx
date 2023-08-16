import Cancel from "@icons/cancel.svg";
import { Dispatch, SetStateAction } from "react";

import styles from "@/styles/components/dialogs/dialoginfo.module.scss";

type DialogInfoProps = {
  header: string;
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function DialogInfo({ header, children, isOpen, setIsOpen }: DialogInfoProps) {
  return (
    <div className={styles.container + `${isOpen ? " visible" : " invisible"}`}>
      <div>
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
