import Image from "next/image";

import styles from "./page.module.scss";

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.bg}></div>
      <div className={styles.imageParent}>
        <Image
          className={styles.image}
          src="/mockup/diary.webp"
          alt="calender"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />
      </div>
    </div>
  );
}
