import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

// import { dishSchema } from ".";

export async function GET(request: Request, { params }: { params: { id: string } }) {
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
