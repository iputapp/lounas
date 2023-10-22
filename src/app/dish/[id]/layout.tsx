import { Metadata } from "next";

import type { Dish } from "@/app/api/v-beta/dish/[id]";

/** @see{@link https://nextjs.org/docs/app/api-reference/functions/generate-metadata} */
export async function generateMetadata({ params }: { params: { id: string } }) {
  const dish = (await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v-beta/dish/${params.id}`
  ).then((res) => res.json())) as Dish;
  return {
    title: `${dish.name} @${dish.restaurant.name}`,
    description: `The lunch recommendation app for IPUT students.\n\n料理『${
      dish.name
    }』\nお店『約${dish.restaurant.name}』\n値段『${dish.price.toLocaleString()}円』\n所要時間『${
      dish.eatTime + dish.restaurant.travelTime * 2
    }分』`,
    openGraph: {
      title: `${dish.name} @${dish.restaurant.name} | lounas`,
      description: `The lunch recommendation app for IPUT students.\n\n料理『${
        dish.name
      }』\nお店『${dish.restaurant.name}』\n値段『${dish.price.toLocaleString()}円』\n所要時間『約${
        dish.eatTime + dish.restaurant.travelTime * 2
      }分』`,
      type: "website",
      locale: "ja_JP",
      url: new URL(`dish/${dish.id}`, process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
      siteName: "lounas",
    },
  } as Metadata;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
