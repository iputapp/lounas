import "./page.scss";

import { PrivacyPlayer } from "@/components/lottie/Privacy";

export default function Privacy() {
  return (
    <main className="main">
      <div className="animation">
        <PrivacyPlayer />
      </div>
      <h1>トラッキングを許可しますか？</h1>
      <div></div>
    </main>
  );
}
