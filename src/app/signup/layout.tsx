import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
  description: "This is a sign up page. You can create an account from this page.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header></header>
      {children}
      <footer></footer>
    </>
  );
}
