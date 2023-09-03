"use client";

import "./style.scss";

import { Noto_Sans_JP } from "next/font/google";

import { BorderdCircleButton } from "@/components/buttons/BorderdCircleButton";
import { BorderedTitle } from "@/components/headers/BorderedTitle";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
});

export default function Test() {
  const goGO = () => {
    console.log("GO!!");
  };
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();

  return (
    <article>
      <div className="bg">
        <span className="circle blue"></span>
        <span className="circle cyan"></span>
        <span className="circle green"></span>
      </div>
      <h1>こんにちは</h1>
      <div className="date">
        <div className="year">{`${year}年`}</div>
        <div className="time">{`${month}月${day}日`}</div>
      </div>
      <section>
        <BorderedTitle title="あなたへのおすすめ" className={`title ${notoSansJP.className}`} />
        <div className="text">3つの質問からあなたにおすすめなお店を提案いたします。</div>
      </section>
      <div className=" w-5/12 ">
        <BorderdCircleButton title="GO!" fontSize="text-4xl" outline onClick={goGO} />
      </div>
    </article>
  );
}
