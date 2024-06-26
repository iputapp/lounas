import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

/** @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config} */
export const dynamic = "force-dynamic";

export async function POST() {
  const cookieStore = cookies();

  const email = cookieStore.get("email")?.value;

  if (!email) return NextResponse.error();

  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
  });

  /** AuthApiError: For security purposes, you can only request this once every 60 seconds */
  if (error?.status === 429)
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  if (error || !data) return NextResponse.error();

  return NextResponse.json({ message: "ok" });
}
