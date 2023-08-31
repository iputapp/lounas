import { CardHorizontal } from "@/components/cards/CardHorizontal";
import { ExpandablePanel } from "@/components/layouts/ExpandablePanel";

export default function Test() {
  const now = new Date();

  const data = {
    timeOpen: now.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" }),
    timeClose: now.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" }),
    timeStay: 900, // seconds
    timeDuration: 300, // seconds
    payment: [
      {
        type: "交通系電子マネー",
        accepted: true,
      },
      {
        type: "クレジットカード",
        accepted: true,
      },
      {
        type: "QRコード決済",
        accepted: false,
      },
      {
        type: "電子マネー",
        accepted: false,
      },
    ],
  };

  return (
    <div className="h-screen w-full bg-gradient-to-b from-indigo-300 to-sky-300 p-4">
      <div className="grid gap-5">
        <CardHorizontal title="カード" image="/icons/media-image.svg" tag={1} />
        <CardHorizontal title="カード" image="/icons/media-image.svg" tag={1} />
        <ExpandablePanel
          expandChildren={
            <div className="grid gap-5">
              <h4 className="text-2xl font-semibold">決済方法</h4>
              <ul className="ms-5 list-disc">
                {data.payment.map((item) => (
                  <li key={item.type}>
                    {item.type}：{item.accepted ? "利用可能" : "利用不可"}
                  </li>
                ))}
              </ul>
            </div>
          }
        >
          <div className="grid gap-5">
            <h4 className="text-2xl font-semibold">店舗情報</h4>
            <ul className="flex flex-col space-y-4">
              <li>
                <p>
                  全日：{data.timeOpen}～{data.timeClose}
                </p>
              </li>
              <li>
                <p>滞在時間：おおよそ{Math.floor(data.timeStay / 60)}分</p>
                <small>※混雑状況により異なります。</small>
              </li>
              <li>
                <p>片道：おおよそ{Math.floor(data.timeDuration / 60)}分</p>
              </li>
            </ul>
          </div>
        </ExpandablePanel>
      </div>
    </div>
  );
}
