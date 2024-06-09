import type { Metadata } from "next";

import { TrianglesCover } from "@/components/backgrounds/TrianglesCover";

export const metadata: Metadata = {
  title: "User",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TrianglesCover />
      {children}
    </>
  );
}
