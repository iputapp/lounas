import styles from "./styles.module.scss";

export function TrianglesCover() {
  return (
    <div className={styles.bg}>
      <span className={`${styles.circle} ${styles.blue}`}></span>
      <span className={`${styles.circle} ${styles.cyan}`}></span>
      <span className={`${styles.circle} ${styles.green}`}></span>
    </div>
  );
}
