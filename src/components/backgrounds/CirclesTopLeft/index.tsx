import styles from "./styles.module.scss";

type CirclesTopLeftProps = {
  zIndex?: "-z-0" | "-z-10" | "-z-20" | "-z-30" | "-z-40" | "-z-50" | "z-auto";
};

export function CirclesTopLeft({ zIndex = "-z-50" }: CirclesTopLeftProps) {
  return (
    <div className={`${styles.bg} ${zIndex}`}>
      <span className={`${styles.circle} ${styles.blue}`}></span>
      <span className={`${styles.circle} ${styles.cyan}`}></span>
      <span className={`${styles.circle} ${styles.green}`}></span>
    </div>
  );
}
