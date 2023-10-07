import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const restaurantId = params.id;

  const isIdValid = verifyUrlId(restaurantId);
  if (!isIdValid) return isIdValid;

  const routeSteps = await prisma.route.findMany({
    where: { restaurantId: restaurantId },
    include: {
      routeType: true,
    },
  });

  // 起点となるstepを探す
  const firstStep = routeSteps.find((step) => !step.previousStepId);
  if (!firstStep) {
    return new Response("Data error: Cannot find first step of route.", { status: 500 });
  }

  // 連結リストを順序配列へ変換する探索的処理
  const sortedRoutes = [firstStep];
  let currentStep = firstStep; // 探索済stepの最後尾
  let foundStepCount = 0;
  const length = routeSteps.length;
  while (currentStep.nextStepId && currentStep) {
    if (foundStepCount >= length) {
      // 2回以上同じstepを通るのはありえない。(チェーンがループしている)
      return new Response("Data error: Route step chain is too long.", { status: 500 });
    }

    const nextStep = routeSteps.find((step) => step.id == currentStep.nextStepId);
    if (!nextStep) {
      return new Response(
        "Data error: While step chain(nextStepId) is defined, the actual record was not found in query response.",
        { status: 500 }
      ); // nextStepIdがDB上で記録されているのにもかかわらず、レスポンスにはレコードが含まれていない
    }

    sortedRoutes.push(nextStep);
    currentStep = nextStep;
    foundStepCount++;
  }
  if (currentStep.nextStepId) {
    // これ、count>=lengthで判定してるから、これは発生しない？要検証
    return new Response("Data error: Route step chain is circular.", { status: 500 });
    // nextStepIdがループしている
  }

  return Nextresponse.json(sortedRoutes);
}
