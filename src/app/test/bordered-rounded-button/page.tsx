"use client";

import { BorderedRoundedButton } from "@/components/buttons/BorderedRoundedButton";

export default function Test() {
  const check = () => {
    console.log("OK!");
  };

  return (
    <div className="grid h-screen place-items-center gap-6 p-6">
      <BorderedRoundedButton title="Sign In" fontSize="text-2xl" onClick={check} />
      <BorderedRoundedButton title="次へ" onClick={check} />
    </div>
  );
}
