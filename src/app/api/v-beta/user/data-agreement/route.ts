import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

import { DataAgreementRequest, dataAgreementRequestSchema } from ".";

/** @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config} */
export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createClient();
  const auth = await supabase.auth.getUser();

  if (auth.error || !auth.data.user) return NextResponse.error();

  /** user can only access their own data - Supabase Row-Level Security (RLS) */
  const user = await prisma.user.findUnique({
    select: {
      dataUsageAgreed: true,
    },
    where: {
      id: auth.data.user.id,
    },
  });

  if (!user) return NextResponse.json("User not found.", { status: 404 });

  return NextResponse.json(user.dataUsageAgreed, { status: 200 });
}

export async function POST(request: Request) {
  const supabase = createClient();
  const auth = await supabase.auth.getUser();

  if (auth.error || !auth.data.user) return NextResponse.error();

  const body = (await request.json()) as Promise<DataAgreementRequest>;
  const payload = dataAgreementRequestSchema.safeParse(body);

  if (!payload.success) return NextResponse.error();

  /** user can only update their own data - Supabase Row-Level Security (RLS) */
  const user = await prisma.user.update({
    where: {
      id: auth.data.user.id,
    },
    data: {
      dataUsageAgreed: payload.data.dataUsageAgreed,
    },
  });

  if (!user) return NextResponse.json("User not found.", { status: 404 });

  return NextResponse.json("ok");
}
