"use client";

import CircularProgress from "@mui/material/CircularProgress";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    router.replace(`${pathname}/quantity`); // first section
  }, [router, pathname]);

  return (
    <div className="grid h-full w-full place-content-center">
      <div className="mx-auto">
        <CircularProgress size={50} thickness={2} sx={{ color: "#07f" }} />
      </div>
    </div>
  );
}
