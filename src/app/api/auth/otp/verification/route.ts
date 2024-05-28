import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

import type { Verification } from ".";
import { verificationSchema } from ".";

/** @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config} */
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const cookieStore = cookies();

  const body = (await request.json()) as Promise<Verification>;
  const payload = verificationSchema.safeParse(body);

  if (!payload.success) return NextResponse.error();

  const email = cookieStore.get("email")?.value;

  if (!email) return NextResponse.json({ error: "Request timeout" }, { status: 408 });

  const supabase = createClient();
  const { data, error } = await supabase.auth.verifyOtp({
    type: "email",
    email: email,
    token: payload.data.password,
  });

  /** AuthApiError: For security purposes, you can only request this once every 60 seconds */
  if (error?.status === 429)
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  /** AuthApiError: Token has expired or is invalid */
  if (error?.status === 401) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  if (error || !data) return NextResponse.error();

  return NextResponse.json({ message: "authenticated" });
}
