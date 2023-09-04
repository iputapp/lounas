import "./style.scss";

import Image from "next/image";
import calender from "public/test/calender.png";

export default function diary() {
  return (
    <div className="diary">
      <Image
        className="img"
        src={calender}
        alt="calender"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
      />
      <section>
        <div className="cs">Coming Soon!</div>
        <div className="development">現在開発中です。</div>
        <div className="caveat">(訪問履歴は現在も記録されています)</div>
      </section>
    </div>
  );
}
