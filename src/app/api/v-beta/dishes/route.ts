import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

// import { dishesSchema } from ".";

export async function GET() {
  const dishes = await prisma.dish.findMany({
    include: {
      restaurant: true,
    },
  });

  /** @todo コメントの解除および`dishes`を`res`に置換 */
  // const res = dishesSchema.parse(dishes);

  return NextResponse.json(dishes);
}
