// import { routeSchema, Route } from ".";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

/** @see{@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config} */
export const dynamic = "error"; // SSG
export const revalidate = 604800; // ISR 7 days

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const routes = await prisma.route.findMany({
    where: { restaurantId: params.id },
    include: {
      routeType: true,
      restaurant: true,
    },
  });

  /** @todo コメントの解除および`routes`を`res`に置換 */
  // const res = routeSchema.parse(routes);

  /** sort with step */
  const sortedRoutes = routes.sort((a, b) => a.step - b.step);

  /* 存在チェック */
  if (!sortedRoutes.length) return NextResponse.error();

  /** 重複チェック */
  if (sortedRoutes.length !== new Set(sortedRoutes).size) return NextResponse.error();

  /**
   * @todo かっしーのアルゴリズムとmergeする
   */
  // const restaurantId = params.id;

  // const isIdValid = verifyUrlId(restaurantId);
  // if (!isIdValid) return isIdValid;

  // const routeSteps = await prisma.route.findMany({
  //   where: { restaurantId: restaurantId },
  //   include: {
  //     routeType: true,
  //   },
  // });

  // // 起点となるstepを探す
  // const firstStep = routeSteps.find((step) => !step.previousStepId);
  // if (!firstStep) {
  //   return new Response("Data error: Cannot find first step of route.", { status: 500 });
  // }

  // // 連結リストを順序配列へ変換する探索的処理
  // const sortedRoutes = [firstStep];
  // let currentStep = firstStep; // 探索済stepの最後尾
  // let foundStepCount = 0;
  // const length = routeSteps.length;
  // while (currentStep.nextStepId && currentStep) {
  //   if (foundStepCount >= length) {
  //     // 2回以上同じstepを通るのはありえない。(チェーンがループしている)
  //     return new Response("Data error: Route step chain is too long.", { status: 500 });
  //   }

  //   const nextStep = routeSteps.find((step) => step.id == currentStep.nextStepId);
  //   if (!nextStep) {
  //     return new Response(
  //       "Data error: While step chain(nextStepId) is defined, the actual record was not found in query response.",
  //       { status: 500 }
  //     ); // nextStepIdがDB上で記録されているのにもかかわらず、レスポンスにはレコードが含まれていない
  //   }

  //   sortedRoutes.push(nextStep);
  //   currentStep = nextStep;
  //   foundStepCount++;
  // }
  // if (currentStep.nextStepId) {
  //   // これ、count>=lengthで判定してるから、これは発生しない？要検証
  //   return new Response("Data error: Route step chain is circular.", { status: 500 });
  //   // nextStepIdがループしている
  // }

  return NextResponse.json(sortedRoutes);
}
