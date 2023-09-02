import { Card } from "@/components/cards/Card";

export default function page() {
  return (
    <div className="mx-auto grid max-w-3xl grid-cols-1 gap-5 p-4">
      <Card
        image="/tukemen.jpg"
        title="つけ麺つけ麺つけ麺つけ麺つけ麺つけ麺つけ麺つけ麺つけ麺つけ麺つけ麺つけ麺つけ麺"
      />
      <Card image="/tukemen.jpg" title="つけ麺" />
      <Card image="/tukemen.jpg" title="つけ麺" />
    </div>
  );
}
