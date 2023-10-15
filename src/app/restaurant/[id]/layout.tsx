import type { Restaurant } from "@/app/api/v-beta/restaurant/[id]";

/** @see{@link https://nextjs.org/docs/app/api-reference/functions/generate-metadata} */
export async function generateMetadata({ params }: { params: { id: string } }) {
  const restaurant = (await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v-beta/restaurant/${params.id}`
  ).then((res) => res.json())) as Restaurant;
  return {
    title: restaurant.name,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
