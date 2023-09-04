"use client";

import "./style.scss";

import { Noto_Sans_JP } from "next/font/google";

import { BorderCircleButton } from "@/components/buttons/BorderCircleButton";
import { BorderTitle } from "@/components/headers/BorderTitle";

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
      <div className="record">
        <div className="date">{`${year}年${month}月${day}日`}</div>
        <div className="objective">
          <div>今月の開拓数：</div>
          <div>3件</div>
        </div>
      </div>
      <section>
        <BorderTitle title="あなたへのおすすめ" className={`title ${notoSansJP.className}`} />
        <div className="text">3つの質問からあなたにおすすめなお店を提案いたします。</div>
      </section>
      <div className="mx-auto w-5/12">
        <BorderCircleButton title="GO!" fontSize="text-4xl" outline onClick={goGO} />
      </div>
    </article>
  );
}
