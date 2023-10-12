import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { userAuth } from "@/lib/supabase";

import { RecommendRequest, recommendRequestSchema } from ".";

export async function GET(request: NextRequest) {
  const session = await userAuth();
  if (session instanceof Response) return session;

  const searchParams = request.nextUrl.searchParams;
  const params = {
    amount: searchParams.get("amount"),
    price: Number(searchParams.get("price")),
    commonality: searchParams.get("commonality"),
  };
  const payload = recommendRequestSchema.safeParse(params);
  if (!payload.success) return NextResponse.error();

  /** 今 */
  const now = new Date();
  /** 今日の曜日 (index) */
  const dayOfWeek = new Date().getDay();
  /** 時間 */
  // const time =
  /** 料理の値段 */
  const price = payload.data.price;

  /** 料理特性スコア */
  type TraitType = keyof RecommendRequest;
  type TraitScore = {
    type: TraitType;
    score: {
      min: number;
      max: number;
    };
  };

  /** 絞り込み項目 */
  const traitFilter = [] as TraitScore[];

  /** @todo 要検討：amount scoreの範囲 */
  const amountName = "amount" as TraitType;
  switch (payload.data.amount) {
    case "small":
      traitFilter.push({
        type: amountName,
        score: {
          min: 0,
          max: 50,
        },
      });
      break;
    case "medium":
      traitFilter.push({
        type: amountName,
        score: {
          min: 50,
          max: 75,
        },
      });
      break;
    case "large":
      traitFilter.push({
        type: amountName,
        score: {
          min: 75,
          max: 100,
        },
      });
      break;
    default:
      traitFilter.push({
        type: amountName,
        score: {
          min: 0,
          max: 100,
        },
      });
      break;
  }

  /** @todo 要検討：commonalit scoreの範囲 */
  const commonalityName = "commonality" as TraitType;
  switch (payload.data.commonality) {
    case "common":
      traitFilter.push({
        type: commonalityName,
        score: {
          min: 0,
          max: 45,
        },
      });
      break;
    case "unique":
      traitFilter.push({
        type: commonalityName,
        score: {
          min: 45,
          max: 100,
        },
      });
      break;
    default:
      traitFilter.push({
        type: commonalityName,
        score: {
          min: 0,
          max: 100,
        },
      });
      break;
  }

  /** query result */
  const results = await prisma.dish.findMany({
    where: {
      restaurant: {
        restaurantOpens: {
          some: {
            weekTypeId: dayOfWeek,
            /**
             * now BETWEEN timeOpen AND timeClose
             * 1970-01-01 00:00:00+00 (Unix system time zero) [timestamp with time zone]
             * @see {@link https://www.postgresql.org/docs/current/datatype-datetime.html#DATATYPE-DATETIME-SPECIAL-VALUES}
             */
            timeOpen: {
              lte: new Date(1970, 0, 1, now.getHours(), now.getMinutes(), now.getSeconds()),
            },
            timeClose: {
              gte: new Date(1970, 0, 1, now.getHours(), now.getMinutes(), now.getSeconds()),
            },
          },
        },
      },
      price: {
        lte: price,
      },
      AND: [
        ...traitFilter.map((trait) => ({
          dishScores: {
            some: {
              score: {
                gte: trait.score.min,
                lt: trait.score.max,
              },
              trait: {
                name: trait.type,
              },
            },
          },
        })),
      ],
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

  /**
   * query result zod validation
   * @todo zod validation
   */
  // const items = recommendResponseSchema.parse(results);
  const items = results;

  /**
   * お昼休みの時間
   * @todo future: depends on organization
   */
  const lunchBreakTime = 45 * 60; // 45 minutes

  /** お昼休みの時間でいける範囲の料理 */
  const logisticallyFeasibleDishes = items.filter(
    (item) => item.restaurant.travelTime * 2 + item.eatTime <= lunchBreakTime
  );

  /** 条件に当てはまる料理が5つ以上 */
  if (logisticallyFeasibleDishes.length >= 5) {
    /** ランダムシャッフル + 初めから5個 */
    const recommends = shuffleDishes(logisticallyFeasibleDishes).slice(0, 5);
    return NextResponse.json(recommends);
  } else {
    /** ランダムシャッフル + 初めから5個 */
    const recommends = shuffleDishes(items).slice(0, 5);
    return NextResponse.json(recommends);
  }
}

/**
 * shuffle dishes
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shuffleDishes = (dishes: any[]): any[] => dishes.sort(() => Math.random() - Math.random());
