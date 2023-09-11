"use client";

import ArrowDown from "@icons/nav-arrow-down.svg";

export default function RestaurantsPage() {
  return (
    <div className="container">
      <div className="header">
        <div className="title">ルート案内</div>
        <div className="guide">
          <div className="information">
            <div className="distance">約 1.5km</div>
            <div className="route">
              <div className="start">徒歩 20分</div>
              <ArrowDown />
              <div className="destination">バス 5分</div>
            </div>
          </div>
          <div className="external">
            <div className="map-img"></div>
            <div className="link">アプリでルートを確認する →</div>
          </div>
        </div>
      </div>
      <div className="main"></div>
    </div>
  );
}
