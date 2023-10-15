import type { Dish } from "@/app/api/v-beta/dish/[id]";
import type { Dishes } from "@/app/api/v-beta/dishes";

/** @see{@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config} */
export const dynamicParams = false; // return a 404 page if the params are not found

/** @see{@link https://nextjs.org/docs/app/api-reference/functions/generate-metadata} */
export async function generateMetadata({ params }: { params: { id: string } }) {
  const dish = (await fetch(`${process.env.BASE_URL}/api/v-beta/dish/${params.id}`).then((res) =>
    res.json()
  )) as Dish;
  return {
    title: `${dish.name} & ${dish.restaurant.name}`,
  };
}

/** @see{@link https://nextjs.org/docs/app/api-reference/functions/generate-static-params} */
export async function generateStaticParams() {
  const dishes = (await fetch(`${process.env.BASE_URL}/api/v-beta/dishes`).then((res) =>
    res.json()
  )) as Dishes;

  return dishes.map((dish) => ({
    params: {
      id: dish.id,
    },
  }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
