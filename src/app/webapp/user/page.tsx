"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

/**
 * This file is for testing purposes.
 * Delete in production.
 */

export default function Page() {
  const router = useRouter();

  useLayoutEffect(() => {
    router.replace("user/signout");
  }, [router]);

  return;
}
