import "./page.scss";

import { ErrorPlayer } from "@/components/lottie/Error";

export default function Test() {
  return (
    <div className="main">
      <h1 className="title">エラー</h1>
      <div className="animation">
        <ErrorPlayer />
      </div>
      <p className="text">認証コード確認時に問題が発生しました</p>
      <h2 className="please">時間をおいて再度お試しください</h2>
    </div>
  );
}
