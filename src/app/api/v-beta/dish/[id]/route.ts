import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

// import { dishSchema } from ".";

/** @see{@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config} */
export const dynamic = "error"; // SSG
export const revalidate = 604800; // ISR 7 days

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const dish = await prisma.dish.findUnique({
    where: { id: params.id },
    include: {
      restaurant: {
        include: {
          restaurantOpens: {
            include: {
              weekType: true,
            },
          },
          payments: {
            include: {
              paymentType: true,
            },
          },
        },
      },
    },
  });

  /** @todo コメントの解除および`dish`を`res`に置換 */
  // const res = dishSchema.parse(dish);

  if (!dish) return new NextResponse("Dish not found", { status: 404 });

  return NextResponse.json(dish);
}
