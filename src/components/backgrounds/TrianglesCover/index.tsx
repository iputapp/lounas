import styles from "./styles.module.scss";

export function TrianglesCover() {
  return (
    <div className={styles.bg}>
      <span className={`${styles.triangle} ${styles.blue}`}></span>
      <span className={`${styles.triangle} ${styles.cyan}`}></span>
      <span className={`${styles.triangle} ${styles.green}`}></span>
      <span className={`${styles.triangle} ${styles.lime}`}></span>
    </div>
  );
}
