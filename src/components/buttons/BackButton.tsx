import Arrow from "@icons/nav-arrow-left.svg";

import styles from "@/styles/components/buttons/backbutton.module.scss";

export function BackButton() {
  return (
    <div className={styles.main}>
      <button className={styles.button}>
        <Arrow />
        <h1>
          <span>戻る</span>
        </h1>
      </button>
    </div>
  );
}
