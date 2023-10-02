import styles from "./styles.module.scss";

type TrianglesBottomProps = {
  move?: boolean;
  zIndex?: "-z-0" | "-z-10" | "-z-20" | "-z-30" | "-z-40" | "-z-50" | "z-auto";
};

export function TrianglesBottom({ move = false, zIndex = "-z-50" }: TrianglesBottomProps) {
  return (
    <div className={`${styles.bg} ${zIndex}`}>
      <span className={`${styles.triangle} ${styles.blue} ${move ? styles.move : ""}`}></span>
      <span className={`${styles.triangle} ${styles.cyan} ${move ? styles.move : ""}`}></span>
      <span className={`${styles.triangle} ${styles.green} ${move ? styles.move : ""}`}></span>
    </div>
  );
}
