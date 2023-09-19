import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
