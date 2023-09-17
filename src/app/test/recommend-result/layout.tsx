import { Noto_Sans_JP } from "next/font/google";

const NotoSansJP = Noto_Sans_JP({ subsets: ["latin"] });

export default function RecommendedResult({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <header className="flex h-1/6 min-w-full items-center justify-center px-5 py-4">
        <h1
          className={`relative m-5 flex w-fit items-center justify-center font-serif text-3xl font-semibold text-gray-800 ${NotoSansJP.className}`}
        >
          あなたへのおすすめ
        </h1>
      </header>
      {children}
    </div>
  );
}