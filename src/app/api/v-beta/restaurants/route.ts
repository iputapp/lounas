import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

// import { restaurantsSchema } from ".";

export async function GET() {
  const restaurants = await prisma.restaurant.findMany();

  /** @todo コメントの解除および`restaurants`を`res`に置換 */
  // const res = restaurantsSchema.parse(restaurants);

  return NextResponse.json(restaurants);
}
