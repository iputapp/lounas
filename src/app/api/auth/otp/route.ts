import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { Signup } from ".";
import { signupSchema } from ".";

/** @see{@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config} */
export const dynamic = "force-dynamic";

const onlyEmailSchema = signupSchema.pick({ email: true });

export async function POST(request: Request) {
  const body = (await request.json()) as Signup;
  const payload = onlyEmailSchema.safeParse(body);

  console.log("payload", payload);

  if (!payload.success) return NextResponse.error();

  const supabase = createRouteHandlerClient({ cookies });
  await supabase.auth.signInWithOtp({
    email: payload.data.email,
    options: {
      emailRedirectTo: `${new URL(request.url).origin}/api/auth/callback`,
    },
  });

  return NextResponse.json({ message: "ok" });
}
