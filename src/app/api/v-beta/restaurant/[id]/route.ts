import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

// import { restaurantSchema } from ".";

/** @see{@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config} */
export const dynamic = "error"; // SSG
export const revalidate = 604800; // ISR 7 days

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: params.id },
  });

  /** @todo コメントの解除および`restaurant`を`res`に置換 */
  // const res = restaurantSchema.parse(restaurant);

  return NextResponse.json(restaurant);
}
