import { Metadata } from "next";

import type { Restaurant } from "@/app/api/v-beta/restaurant/[id]";

/** @see{@link https://nextjs.org/docs/app/api-reference/functions/generate-metadata} */
export async function generateMetadata({ params }: { params: { id: string } }) {
  const restaurant = (await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v-beta/restaurant/${params.id}`
  ).then((res) => res.json())) as Restaurant;

  /** description */
  const description =
    "The lunch recommendation app for IPUT students.\n\nログインユーザーのみ閲覧可能なページです。";

  return {
    title: restaurant.name,
    description: description,
    openGraph: {
      title: `${restaurant.name} | lounas`,
      description: description,
      type: "website",
      locale: "ja_JP",
      url: new URL(
        `restaurant/${restaurant.id}`,
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      ),
      siteName: "lounas",
    },
  } as Metadata;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
