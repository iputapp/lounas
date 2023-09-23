import styles from "./styles.module.scss";

type SelectionStackProps = {
  children: React.ReactNode;
};

export function SelectionStack({ children }: SelectionStackProps) {
  return (
    <div className={`${styles.container} ${styles.neumo}`}>
      <div className={styles.spacer}>{children}</div>
    </div>
  );
}
