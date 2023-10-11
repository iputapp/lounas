import type { Restaurant } from "@/app/api/v-beta/restaurant/[id]";
import type { Restaurants } from "@/app/api/v-beta/restaurants";

/** @see{@link https://nextjs.org/docs/app/api-reference/functions/generate-metadata} */
// eslint-disable-next-line @typescript-eslint/require-await
export async function generateMetadata({ params }: { params: { id: string } }) {
  const restaurant = (await fetch(
    `${process.env.BASE_URL}/api/v-beta/restaurant/${params.id}`
  ).then((res) => res.json())) as Restaurant;
  return {
    title: restaurant.name,
  };
}

/** @see{@link https://nextjs.org/docs/app/api-reference/functions/generate-static-params} */
export async function generateStaticParams() {
  const restaurants = (await fetch(`${process.env.BASE_URL}/api/v-beta/restaurants`).then((res) =>
    res.json()
  )) as Restaurants;

  return restaurants.map((restaurant) => ({
    params: {
      id: restaurant.id,
    },
  }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
