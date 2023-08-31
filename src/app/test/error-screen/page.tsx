import "./page.scss";

import Warnig from "@icons/warning.svg";

export default function Test() {
  return (
    <div className="main">
      <h1 className="title">エラー</h1>
      <Warnig className="icon" />
      <p className="text">認証コード確認時に問題が発生しました</p>
      <h2 className="please">時間をおいて再度お試しください</h2>
    </div>
  );
}
