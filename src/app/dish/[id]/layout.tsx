import type { Dish } from "@/app/api/v-beta/dish/[id]";

/** @see{@link https://nextjs.org/docs/app/api-reference/functions/generate-metadata} */
export async function generateMetadata({ params }: { params: { id: string } }) {
  const dish = (await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v-beta/dish/${params.id}`
  ).then((res) => res.json())) as Dish;
  return {
    title: `${dish.name} & ${dish.restaurant.name}`,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
