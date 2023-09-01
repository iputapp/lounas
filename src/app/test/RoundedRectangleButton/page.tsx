"use client";

import { Noto_Sans_JP } from "next/font/google";

import { RoundedRectangleButton } from "@/components/buttons/RoundedRectangleButton";

const notoSansJP = Noto_Sans_JP({
  display: "swap",
  subsets: ["cyrillic"],
});

export default function Test() {
  const decide = () => {
    console.log("ここに行くわよ");
  };

  const cancel = () => {
    console.log("キャンセルよ");
  };

  return (
    <div className="grid-cols-2 gap-6 p-6">
      <RoundedRectangleButton
        text="Sign In"
        textsize={30}
        Xpadding={100}
        Ypadding={10}
        onClick={decide}
        className={notoSansJP.className}
      />
      <RoundedRectangleButton
        text="次へ"
        textsize={30}
        Xpadding={40}
        Ypadding={10}
        onClick={cancel}
        className={notoSansJP.className}
      />
      <RoundedRectangleButton
        text="終了する"
        textsize={20}
        Xpadding={50}
        Ypadding={5}
        onClick={cancel}
        className={notoSansJP.className}
      />
    </div>
  );
}
