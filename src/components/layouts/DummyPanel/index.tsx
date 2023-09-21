import LogoFill from "@icons/logo-fill.svg";

import styles from "./styles.module.scss";

export function DummyPanel({ children }: { children?: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.logo}>
          <LogoFill />
        </span>
        <span className={styles.title}>IMΛP</span>
      </div>
      <div className={styles.main}>{children}</div>
      <div className={styles.footer}>
        <small>&copy; {new Date().getFullYear()} PROJECT PIPLUP</small>
      </div>
    </div>
  );
}
