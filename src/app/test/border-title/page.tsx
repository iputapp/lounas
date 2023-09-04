import { Noto_Sans_JP } from "next/font/google";

import { BorderTitle } from "@/components/headers/BorderTitle";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
});

export default function Test() {
  return (
    <div className="grid place-items-center gap-5 p-6">
      <BorderTitle title="Quantity" className={notoSansJP.className} />
      <BorderTitle title="Price" className={notoSansJP.className} />
      <BorderTitle title="Taste" className={notoSansJP.className} />
    </div>
  );
}
