import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = cookies();

  const email = cookieStore.get("email")?.value;

  if (!email) return NextResponse.error();

  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { data, error } = await supabase.auth.resend({
    type: "signup",
    email: email,
  });

  if (error || !data) return NextResponse.error();

  return NextResponse.json({ message: "ok" });
}
