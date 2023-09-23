"use client";

import NavArrowDown from "@icons/nav-arrow-down.svg";
import WarningCircle from "@icons/warning-circle.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { RectButton } from "@/components/buttons/RectButton";
import { CardFull, NavigationType } from "@/components/cards/CardFull";
import type { Restaurant } from "@/lib/zod";

import styles from "./page.module.scss";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();

  useEffect(() => {
    console.log("お店ID:", params.id);
  }, [params]);

  /** テスト用 お店データ */
  type RestaurantExtend = Restaurant & {
    timeOpen: Date;
    timeClose: Date;
    travelDistance: number;
  };
  const restaurant: RestaurantExtend = {
    id: "a1199e64-f208-4300-a83e-8d5484d3ea3c",
    urlId: "a1199e64-f208-4300-a83e-8d5484d3ea3c",
    createdAt: new Date("2023-09-21T01:02:34.069Z"),
    updatedAt: new Date("2023-09-21T01:23:45.069Z"),
    name: "横浜家系ラーメン 壱角家 西新宿店",
    description: "トッピングし放題！ネギの入れすぎに注意！\nカウンター・テーブルあり。",
    address: "東京都新宿区西新宿1-14-5 新和ビル 1F",
    website: "https://ichikakuya.com/",
    longtitude: 139.696993,
    latitude: 35.6887057,
    travelTime: 300, // 5分
    timeOpen: new Date("1900-01-01T02:00:00.000Z"),
    timeClose: new Date("1900-01-01T15:00:00.000Z"),
    travelDistance: 300, // 300m
  };

  /** テスト用 api route から返ってくるデータ (予定) */
  const data = {
    origin: "コクーンタワー地下出口",
    restaurant: restaurant,
    routes: [
      {
        image: "/test/route-2.webp",
        description: "右に曲がります",
        navigation: "right",
      },
      {
        image: "/test/route.webp",
        description: "まっすぐ進みます",
        navigation: "straight",
      },
      {
        image: "/test/route.webp",
        description: "左に曲がります",
        navigation: "left",
      },
      {
        image: "/test/route-2.webp",
        description: "道なり",
        navigation: "sharpLeft",
      },
      {
        image: "/test/route.webp",
        description: "道なり",
        navigation: "sharpRight",
      },
      {
        image: "/test/route-2.webp",
        description: "斜め左に進みます",
        navigation: "slightLeft",
      },
      {
        image: "/test/route.webp",
        description: "斜め右に進みます",
        navigation: "slightRight",
      },
      {
        image: "/test/route.webp",
        description: `目の前にセブンイレブンがあります\n今夜飲みに行かないかい？（イケボ）`,
        navigation: "pin",
      },
    ],
  };

  /**
   * 1行の文字数を指定して、文字列を改行する (空白を単語の区切りとする)
   * @param {string} str 文字列
   * @param {number} lineLength 1行の文字数
   * @returns {React.ReactNode} `[<p>{string}</p>, ...]`
   */
  const normalizeText = (str: string, lineLength: number): React.ReactNode => {
    lineLength = 14; // 1行の文字数
    let line: string[] = []; // 1行分の単語を格納する配列

    if (str.length < lineLength) return <p>{str}</p>;

    const htmls = str.split(/\s+/g).map((word, index) => {
      const nextString = [...line, word].join(""); // 1行の文字数に満たない文字列 + 単語
      /** 文字列と単語を結合した際に1行の文字数を超えないか */
      if (nextString.length >= lineLength) {
        const html = <p key={index}>{nextString}</p>; // 1行分の文字列をpタグで囲む
        line = []; // 1行分の単語を格納する配列を初期化
        return html;
      } else {
        line.push(word); // 1行分の単語を格納する配列に単語を追加
      }
    });

    const filtered = htmls.filter((html) => html !== undefined); // undefinedを除外
    const res = [...filtered, <p key={str.length}>{...line}</p>]; // 入り切らなかった単語を1行にまとめて追加
    return res;
  };

  const exit = () => {
    router.replace("/webapp/home");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>ルート案内</div>
        <div className={styles.info}>
          <section>
            <div className={styles.distance}>
              <span>{`約${Math.floor(data.restaurant.travelTime / 60)}分`}</span>
              <span>{`(${data.restaurant.travelDistance}m)`}</span>
            </div>
            <div className={styles.route}>
              <div className={styles.origin}>{normalizeText(data.origin, 14)}</div>
              <span className={styles.icon}>
                <NavArrowDown />
              </span>
              <div className={styles.destination}>{normalizeText(data.restaurant.name, 14)}</div>
            </div>
          </section>
          <section>
            <div className={styles.mapParent}>
              <Image className={styles.map} src="/mockup/map.webp" alt="map" fill />
              <span className={styles.preview}>Coming Soon!</span>
            </div>
            <a
              className={styles.link}
              href={`https://www.google.com/maps/place/${data.restaurant.address}/@${data.restaurant.latitude},${data.restaurant.longtitude},17.5z`}
              target="_blank"
              rel="noopener noreferrer"
            >
              アプリを開く
            </a>
          </section>
        </div>
        <div className={styles.message}>
          <span className={styles.warn}>
            <WarningCircle />
          </span>
          <span className={styles.text}>歩きながらの使用はお控えください。</span>
        </div>
      </div>
      <div className={styles.main}>
        {data.routes.map((route, index) => (
          <CardFull
            key={index}
            image={route.image}
            description={route.description}
            navigation={route.navigation as NavigationType}
          />
        ))}
      </div>
      <div className={styles.footer}>
        <div className={styles.button}>
          <RectButton color="red" onClick={exit}>
            終了する
          </RectButton>
        </div>
      </div>
    </div>
  );
}
