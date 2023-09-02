"use client";

import "./page.scss";

import { BorderdButton } from "@/components/buttons/BorderdCircleButton";

export default function Home() {
  const keep = () => {
    console.log("keep");
  };

  return (
    <div>
      <div className="skipgo">
        <BorderdButton text="Skip" size="100" outborderd={false} decide={keep} />
      </div>
      <div className="skipgo">
        <BorderdButton text="Go!!" size="200" outborderd={true} decide={keep} />
      </div>
    </div>
  );
}
