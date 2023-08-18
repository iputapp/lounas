export const metadata = {
  title: "Test | IMAP",
  description: "A root page of test for Team PROJECT PIPLUP",
};

export default function TestLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
}
