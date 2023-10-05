import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Result",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
