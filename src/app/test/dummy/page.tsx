import { DummyPanel } from "@/components/layouts/DummyPanel";

export default function Test() {
  return (
    <>
      <div className="grid h-screen w-full grid-rows-6 bg-gradient-to-b from-blue-500 to-cyan-500 px-4">
        <div className="row-span-1 self-center">
          <h1 className="text-3xl font-bold">アカウント</h1>
        </div>
        <div className="row-span-1 justify-self-center">
          <span className="text-lg font-semibold text-[#464646]">IMAP会員へようこそ！</span>
        </div>
        <div className="row-span-3 w-11/12 place-self-center">
          <DummyPanel>
            <div className="grid place-items-center gap-4">
              <h2 className="text-base font-semibold">このアプリについて</h2>
              <div className="text-sm">
                <p>こんにちは!!!!! 僕の名前は、、、、</p>
                <p>
                  ピカソのフルネームはパブロ・ディエーゴ・ホセ・フランシスコ・デ・パウラ・ホアン・ネポムセーノ・マリーア・デ・ロス・レメディオス・クリスピーン・クリスピアーノ・デ・ラ・サンティシマ・トリニダード・ルイス・イ・ピカソ。
                </p>
                <p>です。。。 よろしくお願いします！！明日からよろしくお願いします！！</p>
              </div>
            </div>
          </DummyPanel>
        </div>
      </div>
      {
        /* Overlay */
        <div className="fixed inset-0 grid h-screen w-full place-items-center bg-black/30">
          <div className="w-10/12">
            <DummyPanel />
          </div>
        </div>
      }
    </>
  );
}
