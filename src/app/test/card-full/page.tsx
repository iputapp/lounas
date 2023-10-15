import { CardFull } from "@/components/cards/CardFull";

export default function Test() {
  return (
    <div className="grid gap-9 p-6">
      <CardFull image="/test/route.webp" description="右に曲がります" navigation="right" />
      <CardFull image="/test/route.webp" description="まっすぐ進みます" navigation="straight" />
      <CardFull image="/test/route.webp" description="左に曲がります" navigation="left" />
      <CardFull image="/test/route.webp" description="道なり" navigation="sharpLeft" />
      <CardFull image="/test/route.webp" description="道なり" navigation="sharpRight" />
      <CardFull image="/test/route.webp" description="斜め左に進みます" navigation="slightLeft" />
      <CardFull image="/test/route.webp" description="斜め右に進みます" navigation="slightRight" />
      <CardFull image="/test/route.webp" description="斜め右に進みます" navigation="stairsUp" />
      <CardFull image="/test/route.webp" description="斜め右に進みます" navigation="stairsDown" />
      <CardFull
        image="/test/route.webp"
        description="目の前にセブンイレブンがあります
        今夜飲みに行かないかい？（イケボ）目の前にセブンイレブンがあります
        今夜飲みに行かないかい？（イケボ）目の前にセブンイレブンがあります
        今夜飲みに行かないかい？（イケボ）目の前にセブンイレブンがあります
        今夜飲みに行かないかい？（イケボ）"
        navigation="arrival"
      />
    </div>
  );
}
