"use client";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import * as React from "react";

import { RectButton } from "@/components/buttons/RectButton";
import { BorderTitle } from "@/components/headers/BorderTitle";

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
    <div className="container grid h-full w-full items-center justify-center">
      <div className="mx-5 flex items-center justify-center text-center">
        <BorderTitle title="あなたの候補をもとに検索しています" fontSize="text-3xl" />
      </div>
      <div className="m-5 flex  flex-col items-center">
        <Media />
      </div>
      <div className="m-5 flex items-center justify-center">
        <RectButton color="red" onClick={cancel}>
          キャンセル
        </RectButton>
      </div>
    </div>
  );
}
