"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { TrianglesBottom } from "@/components/backgrounds/TrianglesBottom";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOtp, setIsOtp] = useState<boolean>(false);

  useEffect(() => {
    pathname.endsWith("otp") ? setIsOtp(true) : setIsOtp(false);
  }, [pathname]);

  return (
    <>
      <TrianglesBottom move={isOtp} />
      {children}
    </>
  );
}
