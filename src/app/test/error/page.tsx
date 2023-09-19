import { ErrorPlayer } from "@/components/lottie/Error";

import styles from "./page.module.scss";

export default function Test() {
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>エラー</h1>
      <div className={styles.animation}>
        <ErrorPlayer />
      </div>
      <p className={styles.text}>認証コード確認時に問題が発生しました</p>
      <h2 className={styles.please}>時間をおいて再度お試しください</h2>
    </div>
  );
}
