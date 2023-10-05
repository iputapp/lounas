import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { Signup } from ".";
import { signupSchema } from ".";

/** @see{@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config} */
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json()) as Promise<Signup>;
  const payload = signupSchema.safeParse(body);

  if (!payload.success) return NextResponse.error();

  const supabase = createRouteHandlerClient({ cookies });
  const { data, error } = await supabase.auth.signInWithOtp({
    email: payload.data.email,
    options: {
      emailRedirectTo: `${new URL(request.url).origin}/api/auth/callback`,
    },
  });

  if (error || !data) return NextResponse.error();

  /** store email to cookie */
  const cookieStore = cookies();
  cookieStore.set({
    name: "email",
    value: payload.data.email,
    path: "/",
    sameSite: "strict",
    secure: true,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  /** permit users access to the verify page */
  cookies().set({
    name: "verify",
    value: "pending",
    path: "/signup",
    sameSite: "strict",
    secure: true,
    httpOnly: true,
    maxAge: 120, // 2 minutes
  });

  return NextResponse.json({ message: "ok" });
}
