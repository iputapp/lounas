import { Metadata } from "next";

import type { Dish } from "@/app/api/v-beta/dish/[id]";

/** @see{@link https://nextjs.org/docs/app/api-reference/functions/generate-metadata} */
export async function generateMetadata({ params }: { params: { id: string } }) {
  const dish = (await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v-beta/dish/${params.id}`
  ).then((res) => res.json())) as Dish;

  /** 値段 */
  const dishPrice = dish.price.toLocaleString();
  /** 所要時間 */
  const requiredTime = dish.eatTime + dish.restaurant.travelTime * 2;
  /** description */
  const description = `The lunch recommendation app for IPUT students.\n\n料理『${dish.name}』\nお店『約${dish.restaurant.name}』\n値段『${dishPrice}円』\n所要時間『約${requiredTime}分』`;
  /** openGraph image URL */
  const ogImageUrl = new URL(
    `dishes/id/${dish.id}.jpg`,
    `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1697559133`
  );

  return {
    title: `${dish.name} @${dish.restaurant.name}`,
    description: description,
    openGraph: {
      title: `${dish.name} @${dish.restaurant.name} | lounas`,
      description: description,
      type: "website",
      locale: "ja_JP",
      url: new URL(`dish/${dish.id}`, process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
      siteName: "lounas",
      images: [
        {
          type: "image/jpeg",
          url: ogImageUrl,
          width: 1024,
          height: 768,
          alt: `${dish.name} @${dish.restaurant.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@lounas_app",
      title: `${dish.name} @${dish.restaurant.name} | lounas`,
      description: description,
      images: [
        {
          type: "image/jpeg",
          url: ogImageUrl,
          width: 1024,
          height: 768,
          alt: `${dish.name} @${dish.restaurant.name}`,
        },
      ],
    },
  } as Metadata;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
