import "./globals.css";

export const metadata = {
  title: "IMAP",
  description: "PROJECT PIPLUP",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <header></header>
        {children}
      </body>
    </html>
  );
}
