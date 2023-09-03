import { Card } from "@/components/cards/Card";

export default function Test() {
  return (
    <div className="grid grid-cols-1 gap-8 bg-gradient-to-b from-sky-300 to-indigo-300 p-6">
      <Card
        image="/test/ramen.webp"
        title="つけ麺つけ麺つけ麺つけ麺つけ麺つけ麺つけ麺つけ麺つけ麺つけ麺つけ麺つけ麺つけ麺"
      />
      <Card image="/test/ramen.webp" title="つけ麺" />
      <Card image="/test/ramen.webp" title="つけ麺" />
    </div>
  );
}
