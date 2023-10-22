import { ImageResponse } from "next/server";

import type { Dish } from "@/app/api/v-beta/dish/[id]";
import { CldImg } from "@/components/image/CldImg";

/** @see{@link https://nextjs.org/docs/app/api-reference/functions/generate-image-metadata} */
export async function generateImageMetadata({ params }: { params: { id: string } }) {
  const dish = (await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v-beta/dish/${params.id}`
  ).then((res) => res.json())) as Dish;
  return [
    {
      id: dish.id,
      size: {
        width: 1024,
        height: 768,
      },
      alt: `${dish.name} @${dish.restaurant.name}`,
      contentType: "image/webp",
    },
  ];
}

/** Image generation */
export default function Image({ params, name }: { params: { id: string }; name: string }) {
  return new ImageResponse(<CldImg src={`dishes/id/${params.id}.webp`} alt={name} />);
}
