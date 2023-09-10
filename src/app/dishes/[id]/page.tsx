"use client";

import { usePathname, useSearchParams } from "next/navigation";

const dishe = {
  id: 1,
  name: "Pizza",
  description: "A delicious pizza",
};

export default function Dishes() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <>
      <div>foodId:{searchParams}</div>
      <div>pathname:{pathname}</div>
    </>
  );
}
