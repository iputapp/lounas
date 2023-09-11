import Diary from "@test/calendar-mock.webp";

import { BottomNavigationBar } from "@/components/navigations/BottomNavigationBar";

export default function DiaryPage() {
  return (
    <>
      <div>
        <Diary />
      </div>
      <BottomNavigationBar />
    </>
  );
}
