"use client";

import * as React from "react";

import { RectButton } from "@/components/buttons/RectButton";
import { BorderTitle } from "@/components/headers/BorderTitle";

export default function LoadingPage() {
  const onClick = () => {
    console.log("click");
  };

  return (
    <div className="container">
      <div className="m-5 flex items-center justify-center text-center">
        <BorderTitle title="あなたの候補をもとに検索しています" />
      </div>
      <div></div>
      <div className="flex items-center justify-center">
        <RectButton text="キャンセル" color="red" onClick={onClick} />
      </div>
    </div>
  );
}
