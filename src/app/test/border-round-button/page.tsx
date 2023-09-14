"use client";

import { BorderRoundButton } from "@/components/buttons/BorderRoundButton";

export default function Test() {
  const check = () => {
    console.log("OK!");
  };

  return (
    <div className="grid h-screen place-items-center gap-6 p-6">
      <div className="w-3/4">
        <BorderRoundButton fontSize="text-3xl" onClick={check}>
          Sign In
        </BorderRoundButton>
      </div>
      <div className="w-24">
        <BorderRoundButton onClick={check}>次へ</BorderRoundButton>
      </div>
    </div>
  );
}
