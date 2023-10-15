import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { userAuth } from "@/lib/supabase";

import { DataAgreementRequest, dataAgreementRequestSchema } from ".";

export async function GET() {
  const session = await userAuth();
  if (session instanceof Response) return session;

  /** user can only access their own data - Supabase Row-Level Security (RLS) */
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) return NextResponse.json("User not found.", { status: 404 });

  return NextResponse.json(user.dataUsageAgreed, { status: 200 });
}

export async function POST(request: Request) {
  const session = await userAuth();
  if (session instanceof Response) return session;

  const body = (await request.json()) as Promise<DataAgreementRequest>;
  const payload = dataAgreementRequestSchema.safeParse(body);

  if (!payload.success) return NextResponse.error();

  /** user can only update their own data - Supabase Row-Level Security (RLS) */
  const user = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      dataUsageAgreed: payload.data.dataUsageAgreed,
    },
  });

  if (!user) return NextResponse.json("User not found.", { status: 404 });

  return NextResponse.json("ok");
}
