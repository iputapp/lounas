"use client";

import { RectButton } from "@/components/buttons/RectButton";

export default function Test() {
  const decide = () => {
    console.log("ここに行くわよ");
  };

  const cancel = () => {
    console.log("キャンセルよ");
  };

  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      <RectButton text="ここに行く" color="blue" onClick={decide} />
      <RectButton text="キャンセル" color="red" onClick={cancel} />
      <RectButton text="終了する" color="red" onClick={cancel} />
    </div>
  );
}
