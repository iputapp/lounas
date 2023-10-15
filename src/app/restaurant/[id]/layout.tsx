import type { Restaurant } from "@/app/api/v-beta/restaurant/[id]";

/** @see{@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config} */
export const dynamicParams = false; // return a 404 page if the params are not found

/** @see{@link https://nextjs.org/docs/app/api-reference/functions/generate-metadata} */
// eslint-disable-next-line @typescript-eslint/require-await
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
