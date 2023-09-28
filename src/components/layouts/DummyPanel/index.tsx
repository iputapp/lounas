import LogoFullColor from "@icons/logo-full-color.svg";

import styles from "./styles.module.scss";

export function DummyPanel({ children }: { children?: React.ReactNode }) {
  return (
    <article className={styles.container}>
      <section className={styles.header}>
        <span className={styles.logo}>
          <LogoFullColor />
        </span>
      </section>
      <section className={styles.main}>{children}</section>
      <section className={styles.footer}>
        <small>&copy; {new Date().getFullYear()} lounas App Dev. Co.</small>
      </section>
    </article>
  );
}
