"use client";
import "./style.scss";

import { CardFull } from "@components/cards/CardFull";
import ArrowDown from "@icons/nav-arrow-down.svg";

export default function RestaurantsPage() {
  const start = "コクーンタワー地下出口";
  const destination = "らーめん新宿西口店";
  return (
    <div className="container">
      <div className="header">
        <div className="title">ルート案内</div>
        <div className="guide">
          <div className="information">
            <div className="distance">約5分(300m)</div>
            <div className="route">
              <div className="start">{start}</div>
              <div className="arrow-down">
                <ArrowDown />
              </div>
              <div className="destination">{destination}</div>
            </div>
          </div>
          <div className="external">
            <div className="map-img"></div>
            <div className="link">アプリでルートを確認する →</div>
          </div>
        </div>
      </div>
      <div className="main">
        <CardFull image="" description="こんにちは" navigation="straight" />
      </div>
    </div>
  );
}
