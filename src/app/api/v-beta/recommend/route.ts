// import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { Prisma, prisma } from "@/lib/prisma";

// import { TimeOnly } from "@/types/date";
import {
  PaymentType,
  RecommendFixed,
  RecommendQuery,
  RecommendRequest,
  recommendRequestSchema,
} from ".";

/** @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config} */
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const params = {
    amount: searchParams.get("amount"),
    price: Number(searchParams.get("price")),
    commonality: searchParams.get("commonality"),
  };
  const payload = recommendRequestSchema.safeParse(params);
  if (!payload.success) return NextResponse.error();

  /** @see {@link https://nextjs.org/docs/app/api-reference/functions/revalidatePath} */
  // revalidatePath("/recommend/result");

  /** 今 */
  // const now = new Date();
  /** 今の時間 */
  // const nowTimeOnly = new TimeOnly(now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());

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

  /**
   * @todo Remove this when Prisma supports JST
   */
  /** query result */
  const results = await prisma.$queryRaw<RecommendQuery[]>(
    Prisma.sql`
    select d.id, d.name, d.description, d.price, d.eat_time,
    r.id as restaurant_id, r.name as restaurant_name, r.description as restaurant_description,
    r.website, r.address, r.longitude, r.latitude, r.travel_time, r.travel_distance,
    timezone('Asia/Tokyo'::text, ro.time_open) as time_open, timezone('Asia/Tokyo'::text, ro.time_close) as time_close,
    pt.name as payment_name,
    p.accepted as payment_accepted,
    p.details as payment_details
    from dishes as d left outer join restaurants as r on d.restaurant_id = r.id
    left outer join restaurant_opens as ro on r.id = ro.restaurant_id
    left outer join payments as p on r.id = p.restaurant_id
    left outer join payment_types as pt on p.payment_type_id = pt.id
    left outer join dish_scores as ds on d.id = ds.dish_id
    left outer join dish_traits as dt on ds.trait_id = dt.id
    where
    d.price <= ${price}
    and
    ro.week_type_id = extract(dow from date (timezone('Asia/Tokyo', now()::date)))
    and
    timezone('Asia/Tokyo'::text, now()::timetz) between timezone('Asia/Tokyo'::text, ro.time_open) and timezone('Asia/Tokyo'::text, ro.time_close)
    and
    dt.name = ${traitFilter[0].type} and ds.score >= ${traitFilter[0].score.min} and ds.score < ${traitFilter[0].score.max}
    and
    d.id
    in (
      select ds.dish_id from dish_scores as ds left outer join dish_traits as dt on ds.trait_id = dt.id
      where dt.name = ${traitFilter[1].type} and ds.score >= ${traitFilter[1].score.min} and ds.score < ${traitFilter[1].score.max}
    )
    ;
    `
  );
  /** paymentをarrayプロパティにする */
  const resultsObject = results.reduce(
    (acc, cur) => {
      const payments = acc[cur.id]?.payments ?? [];
      acc[cur.id] = {
        basic: {
          ...cur,
        },
        payments: [
          ...payments,
          { type: cur.payment_name as PaymentType, accepted: cur.payment_accepted },
        ],
      };
      return acc;
    },
    {} as Record<string, RecommendFixed>
  );
  /** object to array */
  const array = Object.entries(resultsObject).map(([key, value]) => ({ key, value }));
  /** format object & sort payments */
  const items = array.map((item) => ({
    dish: {
      id: item.value.basic.id,
      name: item.value.basic.name,
      price: item.value.basic.price,
      eatTime: item.value.basic.eat_time,
    },
    restaurant: {
      id: item.value.basic.restaurant_id,
      name: item.value.basic.restaurant_name,
      travelTime: item.value.basic.travel_time,
      travelDistance: item.value.basic.travel_distance,
      timeOpen: item.value.basic.time_open,
      timeClose: item.value.basic.time_close,
      payments: item.value.payments.sort((a, b) => a.type.localeCompare(b.type)),
    },
  }));

  /** query result */
  // const results = await prisma.dish.findMany({
  //   where: {
  //     restaurant: {
  //       restaurantOpens: {
  //         some: {
  //           weekTypeId: now.getUTCDay(), // Prisma's timezone is UTC
  //           /** nowTimeOnly BETWEEN timeOpen AND timeClose */
  //           // timeOpen: {
  //           //   lte: nowTimeOnly,
  //           // },
  //           // timeClose: {
  //           //   gte: nowTimeOnly,
  //           // },
  //         },
  //       },
  //     },
  //     price: {
  //       lte: price,
  //     },
  //     AND: [
  //       ...traitFilter.map((trait) => ({
  //         dishScores: {
  //           some: {
  //             score: {
  //               gte: trait.score.min,
  //               lt: trait.score.max,
  //             },
  //             trait: {
  //               name: trait.type,
  //             },
  //           },
  //         },
  //       })),
  //     ],
  //   },
  //   include: {
  //     restaurant: {
  //       include: {
  //         payments: {
  //           include: {
  //             paymentType: true,
  //           },
  //         },
  //         restaurantOpens: true,
  //       },
  //     },
  //   },
  // });

  /**
   * query result zod validation
   * @todo zod validation
   */
  // const items = recommendResponseSchema.parse(results);

  /**
   * 営業中のお店の料理
   * @todo PrismaでUTC以外('Asia/Tokyo')を扱えるようになれば、この処理は不要になる
   */
  // const filterByTime = items.filter((item) => {
  //   /**
  //    * sort `restaurant.restaurantOpens` by weekTypeId (sort by day of the week)
  //    * n*log(n) / worst case: n^2
  //    */
  //   item.restaurant.restaurantOpens = item.restaurant.restaurantOpens.sort(
  //     (a, b) => a.weekTypeId - b.weekTypeId
  //   );
  //   /** 0: Sunday, 6: Saturday (the reason for sorting in the previous codes) */
  //   const timeOpen = item.restaurant.restaurantOpens[now.getUTCDay()].timeOpen;
  //   const timeClose = item.restaurant.restaurantOpens[now.getUTCDay()].timeClose;
  //   /** nowTimeOnly BETWEEN timeOpen AND timeClose */
  //   return (
  //     new TimeOnly(timeOpen.getUTCHours(), timeOpen.getUTCMinutes(), timeOpen.getUTCSeconds()) <=
  //       nowTimeOnly &&
  //     nowTimeOnly <=
  //       new TimeOnly(timeClose.getUTCHours(), timeClose.getUTCMinutes(), timeClose.getUTCSeconds())
  //   );
  // });

  /**
   * お昼休みの時間
   * @todo future: depends on organization
   */
  const lunchBreakTime = 45 * 60; // 45 minutes

  /** お昼休みの時間でいける範囲の料理 */
  const logisticallyFeasibleDishes = items.filter(
    (item) => item.restaurant.travelTime * 2 + item.dish.eatTime <= lunchBreakTime
  );

  /** 条件に当てはまる料理が5つ以上 */
  if (logisticallyFeasibleDishes.length >= 5) {
    /** ランダムシャッフル + 初めから5個 */
    const recommends = shuffleArray(logisticallyFeasibleDishes).slice(0, 5);
    return NextResponse.json(recommends);
  } else {
    /** ランダムシャッフル + 初めから5個 */
    const recommends = shuffleArray(items).slice(0, 5);
    return NextResponse.json(recommends);
  }
}

/**
 * shuffle array
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shuffleArray = (array: any[]): any[] =>
  array.slice().sort(() => Math.random() - Math.random());
