import { Noto_Sans_JP } from "next/font/google";

import { BorderedTitle } from "@/components/headers/BorderedTitle";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
});

export default function Test() {
  return (
    <div className="grid place-items-center gap-5 p-6">
      <BorderedTitle title="Quantity" className={notoSansJP.className} />
      <BorderedTitle title="Price" className={notoSansJP.className} />
      <BorderedTitle title="Taste" className={notoSansJP.className} />
      <BorderedTitle title="我陰茎超絶舐回舌" />
    </div>
  );
}
