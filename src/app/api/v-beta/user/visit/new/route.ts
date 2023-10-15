import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { VisitRegisterRequest, visitRegisterRequestSchema } from ".";

export async function POST(request: Request) {
  const cookieStore = cookies();

  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const session = await supabase.auth.getSession();

  if (session.error || !session.data.session) return NextResponse.error();

  const body = (await request.json()) as Promise<VisitRegisterRequest>;
  const payload = visitRegisterRequestSchema.safeParse(body);

  if (!payload.success) return NextResponse.error();

  const visit = await prisma.visitHistory.create({
    data: {
      userId: session.data.session.user.id,
      dishId: payload.data.dishId,
    },
  });

  if (!visit) return NextResponse.json("Could not register visit", { status: 500 });

  return NextResponse.json("ok");
}
