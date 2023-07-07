export const metadata = {
  title: "Sign up | IMAP",
  description: "This is a sign up page. You can create an account from this page.",
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header></header>
      {children}
      <footer></footer>
    </>
  );
}
