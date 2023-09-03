"use client";

import { BottomNavigationBar } from "@/components/navigations/BottomNavigationBar";

export default function Test() {
  /** @see {@link https://www.framer.com/learn/how-to-hide-the-navigation-and-status-bar-on-mobile/} */
  return (
    <>
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <div className="grid place-items-center gap-6 p-6">
        <div>なにかしらのコンテンツ</div>
        <div>なにかしらのコンテンツ</div>
        <div>なにかしらのコンテンツ</div>
        <div>なにかしらのコンテンツ</div>
        <div>なにかしらのコンテンツ</div>
        <div>なにかしらのコンテンツ</div>
        <div>なにかしらのコンテンツ</div>
        <div>なにかしらのコンテンツ</div>
        <div>なにかしらのコンテンツ</div>
        <div>なにかしらのコンテンツ</div>
        <div>なにかしらのコンテンツ</div>
        <div>なにかしらのコンテンツ</div>
        <div>なにかしらのコンテンツ</div>
        <div>なにかしらのコンテンツ</div>
        <div>なにかしらのコンテンツ</div>
        <div>なにかしらのコンテンツ</div>
        <div>なにかしらのコンテンツ</div>
        <div>なにかしらのコンテンツ</div>
        <div>なにかしらのコンテンツ</div>
        <div>なにかしらのコンテンツ</div>
      </div>
      <BottomNavigationBar />
    </>
  );
}
