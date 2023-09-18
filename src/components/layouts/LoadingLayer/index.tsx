import { LoadingPlayer } from "@/components/lottie/Loading";

import styles from "./styles.module.scss";

interface LoadingIconProps {
  working?: boolean;
}

/**
 * Loading icon
 * @param working set `useState()` param (Display if `true`)
 */
export function LoadingLayer({ working = true }: LoadingIconProps) {
  return (
    <div
      className={styles.overlay + `${working ? " visible opacity-100" : " invisible opacity-0"}`}
    >
      <div className="aspect-square w-1/5 max-w-[6rem]">
        <LoadingPlayer />
      </div>
    </div>
  );
}
