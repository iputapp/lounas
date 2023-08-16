export const metadata = {
  title: "Test Component | IMAP",
  description: "PROJECT PIPLUP",
};

export default function TestComponentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
}
