"use client";

import "./page.scss";

import { PrivacyPlayer } from "@/components/lottie/Privacy";

export default function Privacy() {
  return (
    <main className="main">
      <div className="privacy">
        <h1 className="title">プライバシー</h1>
        <p>
          このアプリではユーザーがより便利にお使いいただける用に情報提供の協力をお願いしています。
        </p>
      </div>
      <div className="dialiginfo"></div>
      <div className="animation">
        <PrivacyPlayer />
      </div>
      <div className="choice">
        <h1>トラッキングを許可しますか？</h1>
      </div>
    </main>
  );
}
