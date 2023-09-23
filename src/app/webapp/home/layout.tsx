import { Metadata } from "next";

import { CirclesTopLeft } from "@/components/backgrounds/CirclesTopLeft";

export const metadata: Metadata = {
  title: "Home",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CirclesTopLeft />
      {children}
    </>
  );
}
