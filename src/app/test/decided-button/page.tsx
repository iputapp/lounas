"use client";

import { BackButton } from "@/components/buttons/DecidedButton";

export default function TestBackButton() {
  return (
    <div className="m-10 grid grid-cols-2 gap-5 ">
      <BackButton text="ここに行く" id="" color="god" />
      <BackButton text="キープ" id="" color="red" />
    </div>
  );
}
