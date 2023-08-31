"use client";

import { BackButton } from "@/components/buttons/DecideButton/DecidedButton";

export default function TestBackButton() {
  const decide = () => {
    console.log("verify");
  };

  const keep = () => {
    console.log("keep");
  };

  return (
    <div className="m-10 grid grid-cols-2 gap-5 ">
      <BackButton text="ここに行く" color="blue" decided={decide} />
      <BackButton text="キープ" color="red" decided={keep} />
    </div>
  );
}
