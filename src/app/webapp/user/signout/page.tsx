"use client";

import styles from "./page.module.scss";

export default function SignOut() {
  const onClick = () => {
    console.log("clicked");
  };

  return (
    <div className="h-screen w-full overflow-hidden">
      <div className={styles.main}>
        <div className={styles.title}>アカウント</div>
        <button className={styles.container} onClick={onClick}>
          <div className={styles.inner}>
            <span>&emsp;Sign IN&emsp;</span>
          </div>
        </button>
      </div>
    </div>
  );
}
