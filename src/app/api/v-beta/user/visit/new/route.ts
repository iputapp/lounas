import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { VisitRegisterRequest, visitRegisterRequestSchema } from ".";

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const session = await supabase.auth.getSession();
  const userId = session.data.session?.user.id;
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const body = (await request.json()) as Promise<VisitRegisterRequest>;
  const payload = visitRegisterRequestSchema.safeParse(body);
  if (!payload.success) return NextResponse.error();

  const visit = await prisma.visitHistory.create({
    data: {
      dishId: payload.data.dishId,
      userId: userId,
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
