"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

/**
 * This page is used to redirect to the first page of the test.
 * First page is `quantity`.
 */

export default function Test() {
  const router = useRouter();

  useLayoutEffect(() => {
    router.replace("/test/circle-button/quantity");
  }, [router]);

  return (
    <div className="fixed inset-0 grid h-full w-full place-items-center">
      <h1 className="text-xl">loading...</h1>
    </div>
  );
}
