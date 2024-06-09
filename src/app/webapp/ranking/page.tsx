import Image from "next/image";

import { DummyPanel } from "@/components/layouts/DummyPanel";

import styles from "./page.module.scss";

export default function Page() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageParent}>
          <Image
            className={styles.image}
            src="/mockup/ranking.webp"
            alt="ranking"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
        </div>
      </div>
      <div className={styles.overlay}>
        <div className={styles.panel}>
          <DummyPanel>
            <div className="grid h-full w-full place-content-center gap-4 pb-4">
              <span className="text-3xl font-semibold text-neutral-800">Coming Soon!</span>
            </div>
          </DummyPanel>
        </div>
      </div>
    </>
  );
}
