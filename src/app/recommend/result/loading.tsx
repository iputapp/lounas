import React from "react";

import { DishListSuspense } from "@/components/suspenses/DishListSuspense";

export default function Loading() {
  return (
    <DishListSuspense
      messageLine1="あなたの候補をもとに"
      messageLine2="検索しています"
      cancelButtonText="キャンセル"
    />
  );
}
