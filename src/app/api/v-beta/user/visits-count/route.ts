import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

import { visitsCountSchema } from ".";

/** @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config} */
export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createClient();
  const auth = await supabase.auth.getUser();

  if (auth.error || !auth.data.user) return NextResponse.error();

  const today = new Date();

  const visitsCount = await prisma.visitHistory.count({
    where: {
      userId: auth.data.user.id,
      createdAt: {
        gte: new Date(today.getFullYear(), today.getMonth(), 1),
        lt: new Date(today.getFullYear(), today.getMonth() + 1, 1),
      },
    },
  });

  const payload = visitsCountSchema.parse(visitsCount);

  /** @todo performance issue??? */
  // const visitedBefore = visitHistories.filter(
  //   (history) => history.createdAt.getMonth() < today.getMonth()
  // );
  // const visitedThisMonth = visitHistories.filter(
  //   (history) => history.createdAt.getMonth() == today.getMonth()
  // );

  // const visitedBefore: VisitHistory[] = [];
  // const visitedThisMonth: VisitHistory[] = [];
  // visitHistories.forEach((history) => {
  //   if (history.createdAt.getMonth() < today.getMonth()) {
  //     visitedBefore.push(history);
  //   } else if (history.createdAt.getMonth() == today.getMonth()) {
  //     visitedThisMonth.push(history);
  //   }
  // });
  // const monthlyDiscoveries = visitedThisMonth.map((history) => {! visitedBefore.find((before) => before.dishId == history.dishId)});

  /**
   * @todo DB vs Server, which is the best performance??
   * @author KaSHH - nafell
   */
  // type VisitIdDictionary = Record<string, number>;
  // const visitedBefore: VisitIdDictionary = {};
  // const visitedThisMonth: string[] = [];

  // visitHistories.forEach((history) => {
  //   if (history.createdAt.getMonth() < today.getMonth()) {
  //     visitedBefore[history.dishId] = 1;
  //   } else if (history.createdAt.getMonth() == today.getMonth()) {
  //     visitedThisMonth.push(history.dishId);
  //   }
  // });

  // const monthlyDiscoveries = visitedThisMonth.filter((dishId) => !visitedBefore[dishId]);

  // return new Response(JSON.stringify(monthlyDiscoveries.length), { status: 200 });

  return NextResponse.json(payload);
}
