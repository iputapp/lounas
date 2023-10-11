import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { UserAuth } from "@/lib/supabase";

import { RecommendRequest, recommendRequestSchema } from ".";

export async function POST(request: NextRequest) {
  //user auth
  const session = await UserAuth();
  if (session instanceof Response) return session;

  //validate request body
  const body = (await request.json()) as Promise<RecommendRequest>;
  const payload = recommendRequestSchema.safeParse(body);
  if (!payload.success) return NextResponse.error();

  const now: Date = payload.data.clientDate;
  const dayOfWeek = now.getDay();
  const priceMax: number = payload.data.priceMax == 0 ? 1000000 : payload.data.priceMax;
  const lunchBreakSeconds = 45 * 60; //future: depends on organization

  const traits: DishScoreWhereInput[] = [];

  //要検討：amount scoreの範囲
  const amountId = "？？？？？？？？？？？？？？？？？？";
  if (payload.data.amount == "small") {
    traits.push({
      traitId: amountId,
      score: {
        lte: 30,
      },
    });
  } else if (payload.data.amount == "medium") {
    traits.push({
      traitId: amountId,
      score: {
        gt: 30,
        lte: 60,
      },
    });
  } else if (payload.data.amount == "large") {
    traits.push({
      traitId: amountId,
      score: {
        gt: 60,
      },
    });
  }

  const commonalityId = "？？？？？？？？？？？？？？？？？？？？";
  if (payload.data.commonality == "common") {
    traits.push({
      traitId: commonalityId,
      score: {
        lte: 60,
      },
    });
  } else if (payload.data.commonality == "unique") {
    traits.push({
      traitId: commonalityId,
      score: {
        gte: 40,
      },
    });
  }

  const dishes = await prisma.dish.findMany({
    where: {
      //リクエストされた曜日の開店状況で絞り込む
      restaurant: {
        restaurantOpens: {
          some: {
            weekTypeId: dayOfWeek,
            timeOpen: {
              lte: now,
            },
            timeClose: {
              gte: now,
            },
          },
        },
      },
      price: {
        lte: priceMax,
      },
      dishScores: {
        some: {
          AND: traits,
        },
      },
    },
    include: {
      restaurant: {
        include: {
          payments: {
            include: {
              paymentType: true,
            },
          },
        },
      },
    },
  });

  // 45分で言って帰ってこれるお店
  const logisticallyFeasibleDishes = dishes.filter((dish) => {
    return dish.eatTime + dish.restaurant.travelTime * 2 <= lunchBreakSeconds;
  });

  if (logisticallyFeasibleDishes.length >= 5) {
    return NextResponse.json(logisticallyFeasibleDishes);
  }
  //結果の中からランダムに5つ選ぶ
  const randomDishes = logisticallyFeasibleDishes
    .sort(() => Math.random() - Math.random())
    .slice(0, 5);

  //return
  return NextResponse.json(randomDishes);
}