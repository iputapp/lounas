"use client";

import { AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { isSuccess, onExpired } from "@/hooks/auth/signupServer";

export default function SignupTemplate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [success, setSuccess] = useState<boolean>(false);
  useEffect(() => {
    if (searchParams.has("pend")) {
      const res = isSuccess();
      res
        .then((res) => {
          if (res) {
            setSuccess(true);
          } else {
            setSuccess(false);
            router.replace("/signup");
          }
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      router.replace("/signup");
    }
    onExpired();
  }, [router, searchParams]);

  return (
    <main>
      <div className="bg">
        <span className={`triangle blue ${success ? "success" : ""}`}></span>
        <span className={`triangle cyan ${success ? "success" : ""}`}></span>
        <span className={`triangle green ${success ? "success" : ""}`}></span>
      </div>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </main>
  );
}
