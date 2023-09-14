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
    <>
      <div className="grid grid-cols-2 gap-6 p-6">
        <RectButton color="blue" onClick={decide}>
          ここに行く
        </RectButton>
        <RectButton color="red" onClick={cancel}>
          終了する
        </RectButton>
        <RectButton color="red" onClick={cancel}>
          キャンセル
        </RectButton>
      </div>
      <div className="mx-auto grid w-fit grid-cols-2 place-items-center gap-8 px-5">
        <RectButton color="red" onClick={cancel}>
          同意しない
        </RectButton>
        <RectButton color="blue" onClick={decide}>
          同意する
        </RectButton>
      </div>
    </>
  );
}
