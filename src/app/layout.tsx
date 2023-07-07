import "./globals.scss";

export const metadata = {
  title: "IMAP",
  description: "PROJECT PIPLUP",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
