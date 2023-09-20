"use client";

import Skeleton from "@mui/material/Skeleton";
import { useRouter } from "next/navigation";

import { RectButton } from "@/components/buttons/RectButton";
import { BorderTitle } from "@/components/headers/BorderTitle";

import styles from "./page.module.scss";

function BasicSkeleton() {
  return (
    <div className="flex h-14 w-full items-center justify-center space-x-4">
      <Skeleton variant="rounded" width={"3.25rem"} height={"3.25rem"} className="bg-neutral-400" />
      <div className="grid h-full content-around">
        <Skeleton variant="rounded" width={"6rem"} height={"1rem"} className="bg-neutral-400" />
        <Skeleton variant="rounded" width={"8rem"} height={"1rem"} className="bg-neutral-400" />
      </div>
    </div>
  );
}

export default function Page() {
  const router = useRouter();

  const cancel = () => {
    router.back();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <BorderTitle title="あなたの候補をもとに検索しています" fontSize="text-3xl" />
      </h1>
      <div className={styles.skeleton}>
        <BasicSkeleton />
        <BasicSkeleton />
      </div>
      <div className={styles.button}>
        <RectButton color="red" onClick={cancel}>
          キャンセル
        </RectButton>
      </div>
    </div>
  );
}
