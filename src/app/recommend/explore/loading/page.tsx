"use client";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import * as React from "react";

import { RectButton } from "@/components/buttons/RectButton";
import { BorderTitle } from "@/components/headers/BorderTitle";

import styles from "./page.module.scss";

function Media() {
  return (
    <div className="grid gap-5">
      <Stack spacing={1}>
        <Skeleton variant="rounded" width={200} height={100} sx={{ bgcolor: "grey.700" }} />
        <Skeleton variant="rounded" width={200} height={10} sx={{ bgcolor: "grey.700" }} />
        <Skeleton variant="rounded" width={100} height={10} sx={{ bgcolor: "grey.700" }} />
      </Stack>
      <Stack spacing={1}>
        <Skeleton variant="rounded" width={200} height={100} sx={{ bgcolor: "grey.700" }} />
        <Skeleton variant="rounded" width={200} height={10} sx={{ bgcolor: "grey.700" }} />
        <Skeleton variant="rounded" width={100} height={10} sx={{ bgcolor: "grey.700" }} />
      </Stack>
    </div>
  );
}

export default function LoadingPage() {
  const router = useRouter();
  const cancel = () => {
    router.back();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <BorderTitle title="あなたの候補をもとに検索しています" fontSize="text-3xl" />
      </h1>
      <div className={styles.media}>
        <Media />
      </div>
      <div className={styles.button}>
        <RectButton color="red" onClick={cancel}>
          キャンセル
        </RectButton>
      </div>
    </div>
  );
}
