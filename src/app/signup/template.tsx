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
    <main>
      <div className="bg">
        <span className={`triangle blue${success ? " success" : ""}`}></span>
        <span className={`triangle cyan${success ? " success" : ""}`}></span>
        <span className={`triangle green${success ? " success" : ""}`}></span>
      </div>
      <AnimatePresenceLayer
        className="w-full h-screen flex-col-center"
        motionProps={{
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
      >
        {children}
      </AnimatePresenceLayer>
    </main>
  );
}
