"use client";

import { BorderRoundButton } from "@/components/buttons/BorderRoundButton";

export default function Test() {
  const check = () => {
    console.log("OK!");
  };

  return (
    <div className="grid h-screen place-items-center gap-6 p-6">
      <BorderRoundButton title="Sign In" fontSize="text-2xl" onClick={check} />
      <BorderRoundButton title="次へ" onClick={check} />
    </div>
  );
}
