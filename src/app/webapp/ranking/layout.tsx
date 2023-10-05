import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ranking",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
