import { LoadingPlayer } from "@/components/lottie/Loading";
import styles from "@/styles/components/layouts/loading.module.scss";

interface LoadingIconProps {
  working?: boolean;
}

/**
 * Loading icon
 * @param working Set `useState()` param (Display if `true`)
 */
export function LoadingLayer({ working = true }: LoadingIconProps) {
  return (
    <div
      className={styles.overlay + `${working ? " opacity-100 visible" : " opacity-0 invisible"}`}
    >
      <div className="w-1/5 aspect-square">
        <LoadingPlayer />
      </div>
    </div>
  );
}
