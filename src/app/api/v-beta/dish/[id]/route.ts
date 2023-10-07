import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const dishId = params.id;

  const isIdValid = verifyUrlId(dishId);
  if (!isIdValid) return isIdValid;

  const dish = await prisma.dish.findUnique({
    where: { id: dishId },
    include: {
      restaurant: {
        include: {
          restaurantOpens: true,
          payments: {
            include: {
              paymentType: true,
            },
          },
        },
      },
    },
  });

  if (!dish) return new Response("Dish not found", { status: 404 });

  return Nextresponse.json(dish);
}
