import Xmark from "@icons/xmark.svg";

import styles from "@/styles/components/dialogs/dialoginfo.module.scss";

export function DialogInfo({ header, children }: { header: string; children: React.ReactNode }) {
  return (
    <div className={styles.outercontainer}>
      <div className={styles.flexcenter}>
        <div className={styles.header}>
          <Xmark className={styles.xmarkImage} />
          <h1>{header}</h1>
        </div>
        <div className={styles.main}>{children}</div>
      </div>
    </div>
  );
}
