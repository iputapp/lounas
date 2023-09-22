"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useLayoutEffect(() => {
    router.replace("signout");
  }, [router]);

  return children;
}
