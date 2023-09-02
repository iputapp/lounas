import { BackButton } from "@/components/buttons/BackButton";
import { CardHorizontal } from "@/components/cards/CardHorizontal";

export default function TestBackButton() {
  return (
    <div className="grid w-full gap-5 px-1 py-5">
      <div className="p-1">
        <BackButton />
      </div>
      <div className="grid gap-5 p-3">
        <CardHorizontal title="カード" image="/icons/media-image.svg" tag={1} />
        <CardHorizontal title="カード" image="/icons/media-image.svg" tag={2} />
      </div>
    </div>
  );
}
