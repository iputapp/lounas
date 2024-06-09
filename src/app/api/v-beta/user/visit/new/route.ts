import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

import { VisitRegisterRequest, visitRegisterRequestSchema } from ".";

/** @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config} */
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const supabase = createClient();
  const auth = await supabase.auth.getUser();

  if (auth.error || !auth.data.user) return NextResponse.error();

  const body = (await request.json()) as Promise<VisitRegisterRequest>;
  const payload = visitRegisterRequestSchema.safeParse(body);

  if (!payload.success) return NextResponse.error();

  const visit = await prisma.visitHistory.create({
    data: {
      userId: auth.data.user.id,
      dishId: payload.data.dishId,
    },
  });

  if (!visit) return NextResponse.json("Could not register visit", { status: 500 });

  return NextResponse.json("ok");
}
