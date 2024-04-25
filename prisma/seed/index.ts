/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { PrismaClient } from "@prisma/client";
import csv from "csvtojson";

import {
  DishTraitOptionalDefaults,
  OrganizationOptionalDefaults,
  PaymentTypeOptionalDefaults,
  RouteTypeOptionalDefaults,
  WeekTypeOptionalDefaults,
} from "@/lib/zod";
import { TimeOnly } from "@/types/date";

import {
  DISH_ID_NAME_OUTPUT,
  nameIdMapToJson,
  RESTAURANT_ID_NAME_OUTPUT,
  writeJson,
} from "./thumb";
import { generateRouteId, generateUrlId } from "./urlId";

const prisma = new PrismaClient();

// ========================================
// ===== DB tables
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

const logLabel = "[PRISMA SEED]";

// ========================================
// ===== CSV mappings

const routeTypeCsvMapping = new Map<string, string>([
  ["到着(目的地)", "arrival"],
  ["目印", "landmark"],
  ["直進", "strait"],
  ["右折", "right"],
  ["左折", "left"],
  ["前斜め右", "slightRight"],
  ["前斜め左", "slightLeft"],
  ["後ろ斜め右", "sharpRight"],
  ["後ろ斜め左", "sharpLeft"],
  ["階段上り", "stairsUp"],
  ["階段下り", "stairsDown"],
  ["エレベーター", "elevator"],
]);

const amountCsvMapping = new Map<string, number>([
  ["素うどん1杯", 25],
  ["ラーメン1杯", 60],
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
// ===== phase #1: distal tables

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
  console.log(logLabel, "phase 1: seeding distal tables");

  const paymentTypePromises = paymentMethods.map((paymentMethod) => {
    return prisma.paymentType.create({
      data: paymentMethod,
    });
  });
  console.log(logLabel, "created queries for paymentTypes");

  const dishTraitPromises = dishTraits.map((dishTrait) => {
    return prisma.dishTrait.create({
      data: dishTrait,
    });
  });
  console.log(logLabel, "created queries for dishTraits");

  const organizationPromises = user_organizations.map((org) => {
    return prisma.organization.create({
      data: org,
    });
  });
  console.log(logLabel, "created queries for organizations");

  const routeTypePromises = routeTypes.map((routeType) => {
    return prisma.routeType.create({
      data: routeType,
    });
  });
  console.log(logLabel, "created queries for routeTypes");

  const weekTypePromises = weekTypes.map((weekType) => {
    return prisma.weekType.create({
      data: weekType,
    });
  });
  console.log(logLabel, "created queries for weekTypes");

  const paymentTypeRecords = await prisma.$transaction(paymentTypePromises);
  console.log(logLabel, "transaction completed for paymentTypes");
  const dishTraitRecords = await prisma.$transaction(dishTraitPromises);
  console.log(logLabel, "transaction completed for dishTraits");
  const organizationRecords = await prisma.$transaction(organizationPromises);
  console.log(logLabel, "transaction completed for organizations");
  const routeTypeRecords = await prisma.$transaction(routeTypePromises);
  console.log(logLabel, "transaction completed for routeTypes");
  await prisma.$transaction(weekTypePromises);
  console.log(logLabel, "transaction completed for weekTypes");

  const paymentCsvIdMap = new Map<string, string>(
    paymentTypeRecords.map((record: { name: any; id: any }) => [record.name, record.id])
  );
  console.log(paymentCsvIdMap);
  console.log(logLabel, "mapped payments");
  const dishTraitCsvIdMap = new Map<string, string>(
    dishTraitRecords.map((record: { name: any; id: any }) => [record.name, record.id])
  );
  console.log(dishTraitCsvIdMap);
  console.log(logLabel, "mapped dishTraits");
  const routeTypeCsvIdMap = new Map<string, string>(
    routeTypeRecords.map((record: { description: any; id: any }) => [record.description, record.id])
  );
  console.log(routeTypeCsvIdMap);
  console.log(logLabel, "mapped routeTypes");

  return {
    paymentCsvIdMap,
    dishTraitCsvIdMap,
    routeTypeCsvIdMap,
  };
}

// ========================================
// ===== phase #2: proximal tables
async function seedProximalTables(
  paymentCsvIdMap: Map<string, string>,
  dishTraitCsvIdMap: Map<string, string>,
  routeTypeCsvIdMap: Map<string, string>
) {
  console.log(logLabel, "phase 2: seeding distal tables");

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
    チェック済: string;
    営業日程_補足: string;
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

  const restaurantCsv = await csv().fromFile("./prisma/csv/restaurant.csv");
  const restaurantData = restaurantCsv as RestaurantCsvType[];
  console.log(logLabel, "Loaded restaurant.csv");

  const restaurantPromises = restaurantData.map((restaurantCsv) => {
    return prisma.restaurant.create({
      data: {
        id: generateUrlId(),
        name: restaurantCsv.店舗名,
        description: restaurantCsv.説明_任意,
        address: restaurantCsv.住所,
        longitude: 0,
        latitude: 0,
        travelTime: parseInt(restaurantCsv.片道時間_分), //parseInt(restaurantCsv.片道時間_分)
        travelDistance: parseInt(restaurantCsv.道のり距離_m),
        restaurantOpens: {
          create: [
            {
              weekType: {
                connect: {
                  id: weekTypes[0].id,
                },
              },
              timeOpen: parseTimeOnly(restaurantCsv.日open, "open"),
              timeClose: parseTimeOnly(restaurantCsv.日close, "close"),
            },
            {
              weekType: {
                connect: {
                  id: weekTypes[1].id,
                },
              },
              timeOpen: parseTimeOnly(restaurantCsv.月open, "open"),
              timeClose: parseTimeOnly(restaurantCsv.月close, "close"),
            },
            {
              weekType: {
                connect: {
                  id: weekTypes[2].id,
                },
              },
              timeOpen: parseTimeOnly(restaurantCsv.火open, "open"),
              timeClose: parseTimeOnly(restaurantCsv.火close, "close"),
            },
            {
              weekType: {
                connect: {
                  id: weekTypes[3].id,
                },
              },
              timeOpen: parseTimeOnly(restaurantCsv.水open, "open"),
              timeClose: parseTimeOnly(restaurantCsv.水close, "close"),
            },
            {
              weekType: {
                connect: {
                  id: weekTypes[4].id,
                },
              },
              timeOpen: parseTimeOnly(restaurantCsv.木open, "open"),
              timeClose: parseTimeOnly(restaurantCsv.木close, "close"),
            },
            {
              weekType: {
                connect: {
                  id: weekTypes[5].id,
                },
              },
              timeOpen: parseTimeOnly(restaurantCsv.金open, "open"),
              timeClose: parseTimeOnly(restaurantCsv.金close, "close"),
            },
            {
              weekType: {
                connect: {
                  id: weekTypes[6].id,
                },
              },
              timeOpen: parseTimeOnly(restaurantCsv.土open, "open"),
              timeClose: parseTimeOnly(restaurantCsv.土close, "close"),
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
              details: paymentCsvBool(restaurantCsv.現金) ? "現金可能" : null,
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
              details: paymentCsvBool(restaurantCsv.交通系IC) ? "Suica, PASMO, etc." : null,
            },
          ],
        },
      },
    });
  });
  console.log(logLabel, "Created queries for restaurants");

  const restaurantRecords = await prisma.$transaction(restaurantPromises);
  console.log(logLabel, "Transaction completed for restaurants");

  const restaurantNameIdMap = new Map<string, string>(
    restaurantRecords.map((record: { name: any; id: any }) => [record.name, record.id])
  );
  console.log(restaurantNameIdMap);
  console.log(logLabel, "Retrived mapping for restaurants");
  await writeJson(RESTAURANT_ID_NAME_OUTPUT, nameIdMapToJson(restaurantNameIdMap));
  console.log(logLabel, "Exported to: ", RESTAURANT_ID_NAME_OUTPUT);

  type DishCsvType = {
    ファイル名_確認用: string;
    料理名: string;
    店舗名: string;
    価格_税込: string;
    店内所要時間: string;
    量: string;
    普遍的vs個性的: string;
    さっぱりvsガッツリ: string;
    説明_任意: string;
    サムネイル: string;
  };
  const dishCsv = await csv().fromFile("./prisma/csv/dish.csv");
  const dishData = dishCsv as DishCsvType[];
  console.log(logLabel, "Loaded dish.csv");

  const dishPromises = dishData.map((dishCsv) => {
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
  console.log(logLabel, "Created queries for dishes");
  const dishRecords = await prisma.$transaction(dishPromises);
  console.log(logLabel, "Transaction completed for dishes");

  const dishNameIdMap = new Map<string, string>(
    dishRecords.map((record: { name: any; id: any }) => [record.name, record.id])
  );
  console.log(dishNameIdMap);
  console.log(logLabel, "Retrived mapping for dishes");
  await writeJson(DISH_ID_NAME_OUTPUT, nameIdMapToJson(dishNameIdMap));
  console.log(logLabel, "Exported to: ", DISH_ID_NAME_OUTPUT);

  type RouteWithIds = {
    id: string;
    description?: string;
    thumbnailId?: string;
    nextStepId?: string;
    previousStepId?: string;
    restaurantId: string;
    routeTypeId: string;
  };
  type RoutesOfRestauratns = {
    routes: RouteWithIds[];
  };

  const routeCsv = await csv({ noheader: true, output: "csv" }).fromFile("./prisma/csv/route.csv");
  console.log(logLabel, "Loaded route.csv");

  const routeMatryoshka: RoutesOfRestauratns[] = [];
  for (let line = 0; line < routeCsv.length; line += 5) {
    const routeRestaurantCsv = routeCsv.slice(line, line + 4);
    const routeStepCount = routeRestaurantCsv[0].length;
    routeMatryoshka.push({ routes: [] });
    const restaurantCount = routeMatryoshka.length - 1;
    for (let rcounter = 1; rcounter < routeStepCount; rcounter++) {
      if (routeRestaurantCsv[0][rcounter] === "") break;
      const restaurantId = restaurantNameIdMap.get(routeRestaurantCsv[0][0])!;
      const routePayload: RouteWithIds = {
        id: generateRouteId(restaurantId, rcounter - 1),
        restaurantId: restaurantId,
        thumbnailId: routeRestaurantCsv[0][rcounter],
        description: routeRestaurantCsv[1][rcounter],
        routeTypeId: routeTypeCsvIdMap.get(routeRestaurantCsv[2][rcounter])!,
      };

      routeMatryoshka[restaurantCount].routes.push(routePayload);
    }
    routeMatryoshka[restaurantCount].routes.forEach((route, index) => {
      if (index > 0) {
        route.previousStepId = routeMatryoshka[restaurantCount].routes[index - 1].id;
      }
      if (index < routeMatryoshka[restaurantCount].routes.length - 1) {
        route.nextStepId = routeMatryoshka[restaurantCount].routes[index + 1].id;
      }
    });
  }
  console.log(logLabel, "Created route payloads");

  const routePayloads = routeMatryoshka.flatMap((restaurant) => restaurant.routes);
  console.log("Number of routes payload:", routePayloads.length);

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
  console.log(logLabel, "Created queries for routes");

  const routeRecords = await prisma.$transaction(routePromises);
  console.log(logLabel, "Transaction completed for routes");
  console.log("Number of routes:", routeRecords.length);

  console.log("payload == record check:", routePayloads.length === routeRecords.length);

  console.log(logLabel, "Seeding completed!");
}

function parseTimeOnly(timeString: string, type: "open" | "close") {
  if (timeString === "-" || timeString === "") {
    timeString = type === "open" ? "23:59:59" : "00:00:00"; // closed for the whole day
  }

  const [hour, minute, seconds] = timeString.split(":").map((time) => parseInt(time));
  return new TimeOnly(hour, minute, seconds);
}

function generatePaymentDetails(names: string[], values: string[]) {
  if (names.length !== values.length) {
    throw new Error("names.length !== values.length");
  }

  const details = names.map((name, index) => {
    return paymentCsvBool(name) ? values[index] : null;
  });

  const filteredDetails = details.filter((detail) => detail !== undefined && detail !== null);

  return filteredDetails.length ? filteredDetails.join(", ") : null;
}

function paymentCsvBool(value: string) {
  return paymentAvaliableCsvMapping.get(value) ?? false;
}

async function main() {
  const { paymentCsvIdMap, dishTraitCsvIdMap, routeTypeCsvIdMap } = await seedDistalTables();
  // const paymentCsvIdMap = new Map<string, string>([
  //   ["cash","787d4d93-812f-42d9-9be6-5cea5c022cbb"],
  //   ["credit","f216da70-03df-4b88-a9cc-60991a91684e"],
  //   ["qr","ff5cf3e0-13bd-44d3-adff-567b663071f4"],
  //   ["transport","7a340145-57db-4082-9474-f82af9696fc3"],
  //   ["other","78e72293-cc67-403d-b672-99c2f0748ded"],
  // ]);

  // const dishTraitCsvIdMap = new Map<string, string>([
  //   ["amount","4370890b-45b1-4d4d-84d2-6d7b35cf1df4"],
  //   ["commonality","2066ab53-9dbf-41cb-9cc0-7f0491203601"],
  //   ["heaviness","c2119744-6949-44d8-8e95-d932616eccc0"],
  // ]);

  // const routeTypeCsvIdMap = new Map<string, string>([
  //   ["到着(目的地)","3bb687b3-cc5a-444c-a07b-f9aa3321bb9b"],
  //   ["目印","7ed1f09d-cef7-4c0f-b6ba-77915bf179a4"],
  //   ["直進","b7ba42ba-0a4e-4f3b-84cc-eebef7478d7e"],
  //   ["右折","8e3f8c40-0ade-440d-ba44-b38953bdfb63"],
  //   ["左折","49d95910-d090-44f4-b994-305cb6dd0bd2"],
  //   ["前斜め右","a00a820e-fe81-437e-89c5-1fda16e32849"],
  //   ["前斜め左","88e9322a-15c3-451a-92d9-de00b9d1db7f"],
  //   ["後ろ斜め右","f79d35f4-1fcb-4cd7-9ce8-03452abc8797"],
  //   ["後ろ斜め左","72f1c91e-fc25-468b-86a6-a874120f8dbe"],
  //   ["階段上り","5cc65216-71a1-42f1-87ba-38a711b71071"],
  //   ["階段下り","44f4c557-1879-4931-b8cd-a6414b1f17e8"],
  //   ["エレベーター","303e2a2b-c9a9-40df-9728-793ecdf301c4"],
  // ]);

  await seedProximalTables(paymentCsvIdMap, dishTraitCsvIdMap, routeTypeCsvIdMap);
}

main()
  .then(async () => {
    console.log("Seeding completed!");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
