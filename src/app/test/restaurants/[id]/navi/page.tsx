"use client";
import "./style.scss";

import ArrowDown from "@icons/nav-arrow-down.svg";
import Warning from "@icons/warning-circle.svg";
import Image from "next/image";
import Link from "next/link";
import Map from "public/test/map.webp";

import { RectButton } from "@/components/buttons/RectButton";
import { CardFull } from "@/components/cards/CardFull";

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
    <div className="container">
      <div className="header">
        <div className="title">ルート案内</div>
        <div className="guide">
          <div className="information">
            <div className="distance">{`${time}(${far})`}</div>
            <div className="route">
              <div className="start">{start}</div>
              <div className="arrow-down">
                <ArrowDown />
              </div>
              <div className="destination">{destination}</div>
            </div>
          </div>
          <div className="external">
            <div className="map-img">
              <Image className="img" src={Map} alt="map" sizes="w-fit" />
              <div className="preview">Coming&nbsp;Soon!</div>
            </div>
            <Link href={link} className="link">
              アプリでルートを確認する→
            </Link>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="warning">
          <div className="icon">
            <Warning />
          </div>
          <div className="request">歩きながらの使用はお控えください。</div>
        </div>
        <div className="card-full">
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
        </div>
      </div>
      <div className="footer">
        <RectButton text="終了する" color="red" onClick={onclick} />
      </div>
    </div>
  );
}
