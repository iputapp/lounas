import LogoFill from "@icons/logo-fill.svg";

import styles from "./styles.module.scss";

export function DummyPanel({ children }: { children?: React.ReactNode }) {
  return (
    <article className={styles.container}>
      <section className={styles.header}>
        <span className={styles.logo}>
          <LogoFill />
        </span>
        <span className={styles.title}>IMΛP</span>
      </section>
      <section className={styles.main}>{children}</section>
      <section className={styles.footer}>
        <small>&copy; {new Date().getFullYear()} PROJECT PIPLUP</small>
      </section>
    </article>
  );
}
