"use client";

import { BorderCircleButton } from "@/components/buttons/BorderCircleButton";

export default function Test() {
  const goGO = () => {
    console.log("GO!!");
  };

  return (
    <div className="grid h-screen place-items-center gap-6 p-6">
      <div className="w-2/6">
        <BorderCircleButton fontSize="text-2xl" onClick={goGO}>
          Skip
        </BorderCircleButton>
      </div>
      <div className="w-3/5">
        <BorderCircleButton fontSize="text-4xl" outline onClick={goGO}>
          GO!
        </BorderCircleButton>
      </div>
    </div>
  );
}
