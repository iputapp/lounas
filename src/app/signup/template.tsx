"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { AnimatePresenceLayer } from "@/components/layouts/AnimatePresence";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [success, setSuccess] = useState<boolean>(false);
  useEffect(() => {
    if (pathname.endsWith("/otp")) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }, [pathname]);

  return (
    <AnimatePresenceLayer
      motionProps={{
        initial: { opacity: 0, x: "100%" },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: "-100%" },
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
    >
      <div className="bg">
        <span className={`triangle blue${success ? " success" : ""}`}></span>
        <span className={`triangle cyan${success ? " success" : ""}`}></span>
        <span className={`triangle green${success ? " success" : ""}`}></span>
      </div>
      {children}
    </AnimatePresenceLayer>
  );
}
