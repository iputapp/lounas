import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { Verification } from ".";
import { verificationSchema } from ".";

export async function POST(request: Request) {
  const cookieStore = cookies();

  const body = (await request.json()) as Promise<Verification>;
  const payload = verificationSchema.safeParse(body);

  if (!payload.success) return NextResponse.error();

  const email = cookieStore.get("email")?.value;

  if (!email) return NextResponse.error();

  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { data, error } = await supabase.auth.verifyOtp({
    type: "email",
    email: email,
    token: payload.data.password,
  });

  if (error || !data) return NextResponse.error();

  return NextResponse.json({ message: "authenticated" });
}
