"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function Test() {
  const router = useRouter();

  useLayoutEffect(() => {
    router.replace("/test/circle-button/quantity");
  }, [router]);

  return (
    <div className="grid h-screen w-full place-items-center">
      <h1 className="text-xl">loading...</h1>
    </div>
  );
}
