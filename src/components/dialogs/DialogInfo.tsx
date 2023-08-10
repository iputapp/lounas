import Xmark from "@icons/xmark.svg";

import styles from "@/styles/components/dialogs/dialoginfo.module.scss";

export function DialogInfo({ header, body }: { header: string; body: string }) {
  return (
    <div className={styles.outercontainer}>
      <div className={styles.flexcenter}>
        <div className={styles.header}>
          <Xmark className={styles.xmarkimage} />
          <h1>{header}</h1>
        </div>
        <div className={styles.main}>
          <p>{body}</p>
        </div>
      </div>
    </div>
  );
}
