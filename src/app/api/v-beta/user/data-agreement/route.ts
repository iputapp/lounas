import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { DataAgreementRequest, dataAgreementRequestSchema } from ".";

export async function GET() {
  const cookieStore = cookies();

  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const session = await supabase.auth.getSession();

  if (session.error || !session.data.session) return NextResponse.error();

  /** user can only access their own data - Supabase Row-Level Security (RLS) */
  const user = await prisma.user.findUnique({
    where: {
      id: session.data.session.user.id,
    },
  });

  if (!user) return NextResponse.json("User not found.", { status: 404 });

  return NextResponse.json(user.dataUsageAgreed, { status: 200 });
}

export async function POST(request: Request) {
  const cookieStore = cookies();

  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const session = await supabase.auth.getSession();

  if (session.error || !session.data.session) return NextResponse.error();

  const body = (await request.json()) as Promise<DataAgreementRequest>;
  const payload = dataAgreementRequestSchema.safeParse(body);

  if (!payload.success) return NextResponse.error();

  /** user can only update their own data - Supabase Row-Level Security (RLS) */
  const user = await prisma.user.update({
    where: {
      id: session.data.session.user.id,
    },
    data: {
      dataUsageAgreed: payload.data.dataUsageAgreed,
    },
  });

  if (!user) return NextResponse.json("User not found.", { status: 404 });

  return NextResponse.json("ok");
}
