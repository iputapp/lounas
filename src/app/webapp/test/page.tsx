import { CardHorizontal } from "@/components/cards/CardHorizontal";

export default function Page() {
  return (
    <div className="grid gap-7">
      <div>
        <h1 className="text-4xl font-bold">あなたへのおすすめ</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 px-3 sm:grid-cols-2">
        <CardHorizontal title="赤味噌油そば" image="/test/ramen.webp" tag={1} />
        <CardHorizontal title="赤味噌油そば" image="/test/ramen.webp" tag={2} />
        <CardHorizontal title="赤味噌油そば" image="/test/ramen.webp" tag={3} />
        <CardHorizontal title="赤味噌油そば" image="/test/ramen.webp" tag={4} />
        <CardHorizontal title="赤味噌油そば" image="/test/ramen.webp" tag={5} />
      </div>
    </div>
  );
}
