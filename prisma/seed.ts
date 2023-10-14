import * as csv from "csv";
import fs from "fs";

import prisma from "@/lib/prisma";
import { generateRouteId, generateUrlId } from "@/lib/urlId";
import {
  DishTraitOptionalDefaults,
  OrganizationOptionalDefaults,
  PaymentTypeOptionalDefaults,
  RouteTypeOptionalDefaults,
  WeekTypeOptionalDefaults,
} from "@/lib/zod";

// ========================================
// ===== CSV mappings

// 正確な値がほしい
const routeTypeCsvMapping = new Map<string, string>([
  ["到着(目的地)", "arrival"],
  ["目印", "landmark"],
  ["直進", "strait"],
  ["右折", "right-turn"],
  ["左折", "left-turn"],
  ["斜め右", "diagonal-right"],
  ["斜め左", "diagonal-left"],
  ["階段上り", "upstairs"],
  ["階段下り", "downstairs"],
  ["エレベーター", "elevator"],
]);

const amountCsvMapping = new Map<string, number>([
  ["素うどん1杯", 25],
  ["素うどん1杯", 60],
  ["牛丼大盛り", 80],
]);

const eatTimeCsvMapping = new Map<string, number>([
  ["10分～15分", 14],
  ["15分～20分", 19],
  ["20分～25分", 24],
  ["25分以上", 999],
]);

const paymentAvaliableCsvMapping = new Map<string, boolean>([
  ["利用可能", true],
  ["不可", false],
]);

// ========================================
// ===== pass #1: distal tables

// n-to-n(explicit join table)
const paymentMethods: PaymentTypeOptionalDefaults[] = [
  { name: "cash" },
  { name: "credit" },
  { name: "qr" },
  { name: "transport" },
  { name: "other" },
];
const dishTraits: DishTraitOptionalDefaults[] = [
  {
    name: "amount",
    description: "量",
  },
  {
    name: "commonality",
    description: "普遍的vs個性的",
  },
  {
    name: "heaviness",
    description: "さっぱりvsがっつり",
  },
];
const weekTypes: WeekTypeOptionalDefaults[] = [
  { id: 0, name: "sunday" },
  { id: 1, name: "monday" },
  { id: 2, name: "tuesday" },
  { id: 3, name: "wednesday" },
  { id: 4, name: "thursday" },
  { id: 5, name: "friday" },
  { id: 6, name: "saturday" },
];

// 1-to-n
const user_organizations: OrganizationOptionalDefaults[] = [
  {
    name: "IPUTtk-students",
    displayName: "IPUT東京(学生)",
    description: "IPUT東京(学生)",
    isStaff: false,
    isStudent: true,
    emailDomain: "tks.iput.ac.jp",
  },
];

const routeTypes: RouteTypeOptionalDefaults[] = Array.from(routeTypeCsvMapping, ([key, value]) => ({
  name: value,
  description: key,
}));

/**
 * create records for distal tables
 * @returns records
 */
async function seedDistalTables() {
  const paymentTypePromises = paymentMethods.map((paymentMethod) => {
    return prisma.paymentType.create({
      data: paymentMethod,
    });
  });

  const dishTraitPromises = dishTraits.map((dishTrait) => {
    return prisma.dishTrait.create({
      data: dishTrait,
    });
  });

  const organizationPromises = user_organizations.map((org) => {
    return prisma.organization.create({
      data: org,
    });
  });

  const routeTypePromises = routeTypes.map((routeType) => {
    return prisma.routeType.create({
      data: routeType,
    });
  });

  const weekTypePromises = weekTypes.map((weekType) => {
    return prisma.weekType.create({
      data: weekType,
    });
  });

  const paymentTypeRecords = await prisma.$transaction(paymentTypePromises);
  const dishTraitRecords = await prisma.$transaction(dishTraitPromises);
  const organizationRecords = await prisma.$transaction(organizationPromises);
  const routeTypeRecords = await prisma.$transaction(routeTypePromises);
  await prisma.$transaction(weekTypePromises);

  const paymentCsvIdMap = new Map<string, string>(
    paymentTypeRecords.map((record) => [record.name, record.id])
  );
  const dishTraitCsvIdMap = new Map<string, string>(
    dishTraitRecords.map((record) => [record.name, record.id])
  );
  const routeTypeCsvIdMap = new Map<string, string>(
    routeTypeRecords.map((record) => [record.description!, record.id])
  );

  return {
    paymentCsvIdMap,
    dishTraitCsvIdMap,
    routeTypeCsvIdMap,
  };
}

// ========================================
// ===== pass #2: proximal tables

// Restaurant
// Dish
// Route
// + RestaurantOpen
// + Payment
// + DishScore
// ** WeekType
// ** RouteType
// ** PaymentType
// ** DishTrait
// ** Organization

// ? User
// ? + VisitHistory
// ?? ** DishTag
// ?? ** RestaurantTag

// ========================================
const main = async () => {
  const { paymentCsvIdMap, dishTraitCsvIdMap, routeTypeCsvIdMap } = await seedDistalTables();

  type RestaurantCsvType = {
    店舗名: string;
    片道時間_分: string;
    道のり距離_m: string;
    説明_任意: string;
    住所: string;
    現金: string;
    VISA: string;
    MASTER: string;
    JCB: string;
    交通系IC: string;
    楽天Edy: string;
    iD: string;
    QUICPay: string;
    PayPay: string;
    au_Pay: string;
    d払い: string;
    楽天pay: string;
    LINEpay: string;
    日open: string;
    日close: string;
    月open: string;
    月close: string;
    火open: string;
    火close: string;
    水open: string;
    水close: string;
    木open: string;
    木close: string;
    金open: string;
    金close: string;
    土open: string;
    土close: string;
  };
  let restaurantCsvs: RestaurantCsvType[] = [];
  fs.createReadStream("./csv/restaurant.csv").pipe(
    csv.parse({ columns: true }, (error, csv) => {
      if (error) throw error;
      restaurantCsvs = csv as RestaurantCsvType[];
    })
  );

  const restaurantPromises = restaurantCsvs.map((restaurantCsv) => {
    return prisma.restaurant.create({
      data: {
        id: generateUrlId(),
        name: restaurantCsv.店舗名,
        description: restaurantCsv.説明_任意,
        address: restaurantCsv.住所,
        longitude: 0,
        latitude: 0,
        travelTime: parseInt(restaurantCsv.片道時間_分),
        travelDistance: parseInt(restaurantCsv.道のり距離_m),
        restaurantOpens: {
          create: [
            {
              weekType: {
                connect: {
                  id: weekTypes[0].id,
                },
              },
              timeOpen: restaurantCsv.日open,
              timeClose: restaurantCsv.日close,
            },
            {
              weekType: {
                connect: {
                  id: weekTypes[1].id,
                },
              },
              timeOpen: restaurantCsv.月open,
              timeClose: restaurantCsv.月close,
            },
            {
              weekType: {
                connect: {
                  id: weekTypes[2].id,
                },
              },
              timeOpen: restaurantCsv.火open,
              timeClose: restaurantCsv.火close,
            },
            {
              weekType: {
                connect: {
                  id: weekTypes[3].id,
                },
              },
              timeOpen: restaurantCsv.水open,
              timeClose: restaurantCsv.水close,
            },
            {
              weekType: {
                connect: {
                  id: weekTypes[4].id,
                },
              },
              timeOpen: restaurantCsv.木open,
              timeClose: restaurantCsv.木close,
            },
            {
              weekType: {
                connect: {
                  id: weekTypes[5].id,
                },
              },
              timeOpen: restaurantCsv.金open,
              timeClose: restaurantCsv.金close,
            },
            {
              weekType: {
                connect: {
                  id: weekTypes[6].id,
                },
              },
              timeOpen: restaurantCsv.土open,
              timeClose: restaurantCsv.土close,
            },
          ],
        },
        payments: {
          create: [
            {
              paymentType: {
                connect: {
                  id: paymentCsvIdMap.get("cash")!,
                },
              },
              accepted: paymentCsvBool(restaurantCsv.現金),
              details: "可能",
            },
            {
              paymentType: {
                connect: {
                  id: paymentCsvIdMap.get("credit")!,
                },
              },
              accepted:
                paymentCsvBool(restaurantCsv.VISA) ||
                paymentCsvBool(restaurantCsv.MASTER) ||
                paymentCsvBool(restaurantCsv.JCB),
              details: generatePaymentDetails(
                [restaurantCsv.VISA, restaurantCsv.MASTER, restaurantCsv.JCB],
                ["VISA", "MASTER", "JCB"]
              ),
            },
            {
              paymentType: {
                connect: {
                  id: paymentCsvIdMap.get("qr")!,
                },
              },
              accepted:
                paymentCsvBool(restaurantCsv.PayPay) ||
                paymentCsvBool(restaurantCsv.au_Pay) ||
                paymentCsvBool(restaurantCsv.d払い) ||
                paymentCsvBool(restaurantCsv.楽天pay) ||
                paymentCsvBool(restaurantCsv.LINEpay),
              details: generatePaymentDetails(
                [
                  restaurantCsv.PayPay,
                  restaurantCsv.au_Pay,
                  restaurantCsv.d払い,
                  restaurantCsv.楽天pay,
                  restaurantCsv.LINEpay,
                ],
                ["PayPay", "au Pay", "d払い", "楽天pay", "LINEpay"]
              ),
            },
            {
              paymentType: {
                connect: {
                  id: paymentCsvIdMap.get("transport")!,
                },
              },
              accepted: paymentCsvBool(restaurantCsv.交通系IC),
              details: "可能",
            },
          ],
        },
      },
    });
  });

  const restaurantRecords = await prisma.$transaction(restaurantPromises);
  const restaurantNameIdMap = new Map<string, string>(
    restaurantRecords.map((record) => [record.name, record.id])
  );

  type DishCsvType = {
    料理名: string;
    店舗名: string;
    価格_税込: string;
    店内所要時間: string;
    量: string;
    普遍的vs個性的: string;
    さっぱりvsガッツリ: string;
    説明_任意: string;
  };

  let dishCsvs: DishCsvType[] = [];
  fs.createReadStream("./csv/dish.csv").pipe(
    csv.parse({ columns: true }, (error, csv) => {
      if (error) throw error;
      dishCsvs = csv as DishCsvType[];
    })
  );

  const dishPromises = dishCsvs.map((dishCsv) => {
    return prisma.dish.create({
      data: {
        id: generateUrlId(),
        name: dishCsv.料理名,
        description: dishCsv.説明_任意,
        price: parseInt(dishCsv.価格_税込),
        eatTime: eatTimeCsvMapping.get(dishCsv.店内所要時間)!,
        restaurant: {
          connect: {
            id: restaurantNameIdMap.get(dishCsv.店舗名)!,
          },
        },
        dishScores: {
          create: [
            {
              trait: {
                connect: {
                  id: dishTraitCsvIdMap.get("amount")!,
                },
              },
              score: amountCsvMapping.get(dishCsv.量)!,
            },
            {
              trait: {
                connect: {
                  id: dishTraitCsvIdMap.get("commonality")!,
                },
              },
              score: parseInt(dishCsv.普遍的vs個性的),
            },
            {
              trait: {
                connect: {
                  id: dishTraitCsvIdMap.get("heaviness")!,
                },
              },
              score: parseInt(dishCsv.さっぱりvsガッツリ),
            },
          ],
        },
      },
    });
  });
  const dishRecords = await prisma.$transaction(dishPromises);

  let routeLines: string[] = [];
  fs.readFile("./csv/route.csv", "utf-8", (error, data) => {
    if (error) throw error;
    routeLines = data.split("\n").filter((line) => line.length > 0);
  });

  type RouteWithIds = {
    id: string;
    description?: string;
    thumbnailId?: string;
    nextStepId?: string;
    previousStepId?: string;
    restaurantId: string;
    routeTypeId: string;
  };

  const routePayloads: RouteWithIds[] = [];
  for (let line = 0; line < routeLines.length / 5; line += 5) {
    const routeRestaurantCsv = routeLines.slice(line, line + 4).map((line) => line.split(","));
    const routeStepCount = routeRestaurantCsv[0].length;
    for (let rcounter = 1; rcounter < routeStepCount; rcounter++) {
      const restaurantId = restaurantNameIdMap.get(routeRestaurantCsv[0][0])!;
      const routePayload: RouteWithIds = {
        id: generateRouteId(restaurantId, rcounter - 1),
        restaurantId: restaurantId,
        thumbnailId: routeRestaurantCsv[0][rcounter],
        description: routeRestaurantCsv[1][rcounter],
        routeTypeId: routeTypeCsvIdMap.get(routeRestaurantCsv[2][rcounter])!,
      };

      if (rcounter > 0) {
        routePayload.previousStepId = routePayloads[rcounter - 1].id;
      }
      if (rcounter < routeStepCount - 1) {
        routePayload.nextStepId = generateUrlId();
      }

      routePayloads.push(routePayload);
    }
  }

  const routePromises = routePayloads.map((routePayload) => {
    return prisma.route.create({
      data: {
        id: routePayload.id,
        description: routePayload.description,
        thumbnailId: routePayload.thumbnailId,
        restaurant: {
          connect: {
            id: routePayload.restaurantId,
          },
        },
        previousStepId: routePayload.previousStepId,
        nextStepId: routePayload.nextStepId,
        routeType: {
          connect: {
            id: routePayload.routeTypeId,
          },
        },
      },
    });
  });

  const routeRecords = await prisma.$transaction(routePromises);
};

function generatePaymentDetails(names: string[], values: string[]): string {
  if (names.length !== values.length) {
    throw new Error("names.length !== values.length");
  }

  const details = names.map((name, index) => `${name}:${values[index]}`).join(", ");

  return details;
}

function paymentCsvBool(value: string) {
  return paymentAvaliableCsvMapping.get(value) ?? false;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
