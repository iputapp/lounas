import { ErrorPlayer } from "@/components/lottie/Error";

import styles from "./page.module.scss";

export default function Error() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>エラー</h1>
      <div className={styles.animation}>
        <ErrorPlayer />
      </div>
      <div className={styles.description}>
        <span className={styles.secondary}>認証コードの確認で問題が発生しました</span>
        <span className={styles.primary}>時間をおいて再度お試しください</span>
      </div>
    </div>
  );
}
