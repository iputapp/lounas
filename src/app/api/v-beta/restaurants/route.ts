import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

// import { restaurantsSchema } from ".";

/** @see{@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config} */
export const dynamic = "error"; // SSG
export const revalidate = 604800; // ISR 7 days

export async function GET() {
  const restaurants = await prisma.restaurant.findMany();

  /** @todo コメントの解除および`restaurants`を`res`に置換 */
  // const res = restaurantsSchema.parse(restaurants);

  return NextResponse.json(restaurants);
}
