import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diary",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
