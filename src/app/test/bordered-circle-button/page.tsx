"use client";

import { BorderdCircleButton } from "@/components/buttons/BorderdCircleButton";

export default function Home() {
  const keep = () => {
    console.log("keep");
  };

  return (
    <div className="grid place-items-center gap-5 p-6">
      <BorderdCircleButton text="Skip" size="100" outborderd={false} decide={keep} />
      <BorderdCircleButton text="Go!!" size="200" outborderd={true} decide={keep} />
    </div>
  );
}
