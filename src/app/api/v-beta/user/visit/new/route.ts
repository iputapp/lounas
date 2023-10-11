import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { VisitRegisterRequest, visitRegisterRequestSchema } from ".";

export async function POST(request: Request) {
  const body = (await request.json()) as Promise<VisitRegisterRequest>;
  const payload = visitRegisterRequestSchema.safeParse(body);
  if (!payload.success) return NextResponse.error();

  const visit = await prisma.visitHistory.create({
    data: {
      dishId: payload.data.dishId,
      userId: payload.data.userId,
    },
  });

  if (!visit) {
    return {
      status: 500,
      body: {
        message: "Could not register visit. Something went wrong.",
      },
    };
  }

  return NextResponse.json("ok");
}
