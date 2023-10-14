import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

// import { dishesSchema } from ".";

/** @see{@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config} */
export const dynamic = "error"; // SSG
export const revalidate = 604800; // ISR 7 days

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
