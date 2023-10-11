import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { userAuth } from "@/lib/supabase";

import { DataAgreementRequest, dataAgreementRequestSchema } from ".";

export async function GET(request: Request) {
  const session = await userAuth();
  if (session instanceof Response) return session;

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return new Response("User not found.", { status: 404 });
  }

  return new Response(JSON.stringify(user.dataUsageAgreed), { status: 200 });
}

export async function POST(request: Request) {
  const session = await UserAuth();
  if (session instanceof Response) return session;

  const body = (await request.json()) as Promise<DataAgreementRequest>;
  const payload = dataAgreementRequestSchema.safeParse(body);
  if (!payload.success) return NextResponse.error();

  const user = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      dataUsageAgreed: payload.data.dataUsageAgreed,
    },
  });

  if (!user) {
    return new Response("User not found.", { status: 404 });
  }

  return NextResponse.json("ok");
}
