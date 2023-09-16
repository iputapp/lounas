"use client";
import ArrowDown from "@icons/nav-arrow-down.svg";
import Warning from "@icons/warning-circle.svg";
import Image from "next/image";
import Link from "next/link";
import Map from "public/test/map.webp";

import { RectButton } from "@/components/buttons/RectButton";
import { CardFull } from "@/components/cards/CardFull";

import styles from "./page.module.scss";

export default function RestaurantsPage() {
  const start = "コクーンタワー地下出口";
  const destination = "らーめん新宿西口店";
  const link = "https://www.google.com/?hl=ja";
  const time = "3分";
  const far = "300m";
  const onclick = () => {
    console.log("click");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>ルート案内</div>
        <div className={styles.guide}>
          <div className={styles.information}>
            <div className={styles.distance}>{`${time}(${far})`}</div>
            <div className={styles.route}>
              <div className={styles.start}>{start}</div>
              <div className={styles.arrowdown}>
                <ArrowDown />
              </div>
              <div className={styles.destination}>{destination}</div>
            </div>
          </div>
          <div className={styles.external}>
            <div className={styles.mapimg}>
              <Image className={styles.img} src={Map} alt="map" fill />
              <div className={styles.preview}>Coming&nbsp;Soon!</div>
            </div>
            <Link href={link} className={styles.link}>
              アプリでルートを確認する→
            </Link>
          </div>
        </div>
        <div className={styles.warning}>
          <div className={styles.icon}>
            <Warning />
          </div>
          <div className={styles.request}>歩きながらの使用はお控えください。</div>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.cardfull}>
          <CardFull image="/test/route.webp" description="こんにちは" navigation="straight" />
          <CardFull image="/test/route.webp" description="こんにちは" navigation="sharpLeft" />
          <CardFull image="/test/route.webp" description="こんにちは" navigation="straight" />
          <CardFull image="/test/route.webp" description="こんにちは" navigation="straight" />
          <CardFull image="/test/route.webp" description="こんにちは" navigation="slightLeft" />
          <CardFull image="/test/route.webp" description="右に曲がります" navigation="right" />
          <CardFull image="/test/route.webp" description="まっすぐ進みます" navigation="straight" />
          <CardFull image="/test/route.webp" description="左に曲がります" navigation="left" />
          <CardFull image="/test/route.webp" description="道なり" navigation="sharpLeft" />
          <CardFull image="/test/route.webp" description="道なり" navigation="sharpRight" />
          <CardFull
            image="/test/route.webp"
            description="斜め左に進みます"
            navigation="slightLeft"
          />
          <CardFull
            image="/test/route.webp"
            description="斜め右に進みます"
            navigation="slightRight"
          />
          <CardFull
            image="/test/route.webp"
            description="目の前にセブンイレブンがあります。
            今夜飲みに行かないかい？（イケボ）目の前にセブンイレブンがあります"
            navigation="pin"
          />
          <div className={styles.footer}>
            <div className="w-1/2">
              <RectButton color="red" onClick={onclick}>
                終了する
              </RectButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
