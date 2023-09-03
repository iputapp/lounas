import { BackButton } from "@/components/buttons/BackButton";
import { CardHorizontal } from "@/components/cards/CardHorizontal";

export default function TestBackButton() {
  return (
    <div className="grid gap-6 px-3 py-6">
      <div className="sticky">
        <BackButton className="text-3xl" />
        <BackButton title={"戻る"} className="text-2xl" />
      </div>
      <div className="grid gap-5 p-3">
        <CardHorizontal title="カード" image="/test/ramen.webp" tag={1} />
        <CardHorizontal title="カード" image="/test/ramen.webp" tag={2} />
      </div>
    </div>
  );
}
