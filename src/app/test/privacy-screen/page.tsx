"use client";

import "./page.scss";

import { RectButton } from "@/components/buttons/RectButton";
import { PrivacyPlayer } from "@/components/lottie/Privacy";

export default function Privacy() {
  const onClick = () => {
    console.log("button clicked");
  };
  return (
    <main className="main">
      <div className="privacy">
        <h1>プライバシー</h1>
        <p>
          このアプリではユーザーがより便利にお使いいただける用に情報提供の協力をお願いしています。
        </p>
      </div>
      <div className="dialoginfo">私たちが考えるプライバシーについて詳しく知る</div>
      <div className="animation">
        <PrivacyPlayer />
      </div>
      <div className="choice">
        <h1>トラッキングを許可しますか？</h1>
        <div className="button">
          <RectButton text="拒否する" color="red" onClick={onClick}></RectButton>
          <RectButton text="許可する" color="blue" onClick={onClick}></RectButton>
        </div>
      </div>
    </main>
  );
}
