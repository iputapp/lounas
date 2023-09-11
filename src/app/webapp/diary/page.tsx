import "./style.scss";

import Image from "next/image";
import Calender from "public/test/calendar-mock.webp";

import { BottomNavigationBar } from "@/components/navigations/BottomNavigationBar";

export default function DiaryPage() {
  return (
    <>
      <div className="diary">
        <Image
          className="img"
          src={Calender}
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
      <BottomNavigationBar />
    </>
  );
}
