import { Noto_Sans_JP } from "next/font/google";

import { BorderTitle } from "@/components/headers/BorderTitle";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
});

export default function Test() {
  return (
    <div className="grid place-items-center gap-5 p-6">
      <BorderTitle className={notoSansJP.className}>
        <h1>Quantity</h1>
      </BorderTitle>
      <BorderTitle className={notoSansJP.className}>
        <h1>Price</h1>
      </BorderTitle>
      <BorderTitle className={notoSansJP.className}>
        <h1>Taste</h1>
      </BorderTitle>
      <BorderTitle
        fontSize="text-3xl"
        fontWeight="font-semibold"
        boderPadding="py-6"
        className={notoSansJP.className}
      >
        <h2>あなたへのおすすめ</h2>
      </BorderTitle>
      <BorderTitle
        fontSize="text-3xl"
        fontWeight="font-bold"
        boderPadding="py-6"
        lineHeight="leading-normal"
        className={`${notoSansJP.className} text-center`}
      >
        <h1>あなたの候補をもとに検索しています</h1>
      </BorderTitle>
    </div>
  );
}
