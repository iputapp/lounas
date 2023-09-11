"use client";
import "./style.scss";

import { BorderRoundButton } from "@/components/buttons/BorderRoundButton";
import { Thisapp } from "@/components/dummy/ThisApp";
import { BottomNavigationBar } from "@/components/navigations/BottomNavigationBar";

export default function Test() {
  const onClick = () => {
    console.log("clicked");
  };

  return (
    <div className="h-full overflow-hidden">
      <div className="bg">
        <span className="triangle blue"></span>
        <span className="triangle cyan"></span>
        <span className="triangle green1"></span>
        <span className="triangle green2"></span>
      </div>
      <div className="main">
        <div className="title">アカウント</div>
        <div className="go">
          <div className="text">IMAP会員へようこそ !</div>
          <div className="button">
            <BorderRoundButton title="&emsp;Sign IN&emsp;" fontSize="text-2xl" onClick={onClick} />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Thisapp>
            <p className=" break-words">
              こんにちは!!!!! 僕の名前は、、、、
              ピカソのフルネームはパブロ・ディエーゴ・ホセ・フランシスコ・デ・パウラ・ホアン・ネポムセーノ・マリーア・デ・ロス・レメディオス・クリスピーン・クリスピアーノ・デ・ラ・サンティシマ・トリニダード・ルイス・イ・ピカソ。
              です。。。 よろしくお願いします！！明日からよろしくお願いします！！
            </p>
          </Thisapp>
        </div>
      </div>
      <BottomNavigationBar />
    </div>
  );
}
