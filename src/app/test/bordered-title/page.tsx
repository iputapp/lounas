import { Noto_Sans_JP } from "next/font/google";

import { BorderedTitle } from "@/components/headers/BorderedTitle";

const notoSansJP = Noto_Sans_JP({
  display: "swap",
  subsets: ["cyrillic"],
});

export default function Test() {
  return (
    <div>
      <BorderedTitle text="Quantity" className={notoSansJP.className} />
      <BorderedTitle text="Price" className={notoSansJP.className} />
      <BorderedTitle text="Taste" className={notoSansJP.className} />
      <BorderedTitle text="我陰茎超絶舐回舌" className={notoSansJP.className} />
    </div>
  );
}
