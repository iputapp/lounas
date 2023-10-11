import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

// import { restaurantSchema } from ".";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: params.id },
  });

  // const res = restaurantSchema.parse(restaurant);

  return NextResponse.json(restaurant);
}
