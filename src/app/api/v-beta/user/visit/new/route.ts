import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { userAuth } from "@/lib/supabase";

import { VisitRegisterRequest, visitRegisterRequestSchema } from ".";

export async function POST(request: Request) {
  const session = await userAuth();
  if (session instanceof Response) return session;

  const body = (await request.json()) as Promise<VisitRegisterRequest>;
  const payload = visitRegisterRequestSchema.safeParse(body);
  if (!payload.success) return NextResponse.error();

  const visit = await prisma.visitHistory.create({
    data: {
      userId: session.user.id,
      dishId: payload.data.dishId,
    },
  });

  if (!visit) return NextResponse.json("Could not register visit", { status: 500 });

  return NextResponse.json("ok");
}
