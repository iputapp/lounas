"use client";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
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
  const onClick = () => {
    console.log("click");
  };

  return (
    <div className="container grid h-screen items-center justify-center">
      <div className="mx-5 flex items-center justify-center text-center">
        <BorderTitle title="あなたの候補をもとに検索しています" fontSize="text-3xl" />
      </div>
      <div className="m-5 flex  flex-col items-center">
        <Media />
      </div>
      <div className="m-5 flex items-center justify-center">
        <RectButton text="キャンセル" color="red" onClick={onClick} />
      </div>
    </div>
  );
}
