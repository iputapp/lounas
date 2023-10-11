import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { UserAuth } from "@/lib/supabase";

import { DataAgreementRequest, dataAgreementRequestSchema } from ".";

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const session = await supabase.auth.getSession();
  const userId = session.data.session?.user.id;
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
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
