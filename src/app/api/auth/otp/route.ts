import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { EMAIL_DOMAIN } from "@/constants";

export const OtpSigninRequestSchema = z.object({
  email: z.string().email().endsWith(EMAIL_DOMAIN),
});

export type OtpSigninRequest = z.infer<typeof OtpSigninRequestSchema>;

export async function POST(request: Request) {
  const body = await request.json();
  const payload: OtpSigninRequest = OtpSigninRequestSchema.parse(body);

  const supabase = createRouteHandlerClient({ cookies });

  const { data, error } = await supabase.auth.signInWithOtp({
    email: payload.email,
    options: {
      emailRedirectTo: `${location.origin}/api/auth/callback`,
    },
  });

  if (error) {
    return NextResponse.error();
  }

  if (data) {
    return NextResponse.json("ok");
  }
}
