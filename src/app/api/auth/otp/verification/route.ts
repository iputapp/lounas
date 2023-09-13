import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { EMAIL_DOMAIN } from "@/constants";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export const OtpVerifyRequestSchema = z.object({
  email: z.string().email().endsWith(EMAIL_DOMAIN),
  password: z.string().length(6),
});

export type OtpVerifyRequest = z.infer<typeof OtpVerifyRequestSchema>;

export async function POST(request: Request) {
  const body = await request.json();
  const payload: OtpVerifyRequest = OtpVerifyRequestSchema.parse(body);

  const supabase = createRouteHandlerClient({ cookies });

  const { data, error } = await supabase.auth.verifyOtp({
    email: payload.email,
    token: payload.password,
    type: "email",
  });

  if (error) {
    return NextResponse.error();
  }

  if (data) {
    const secret = process.env.JWT_SECRET;
    const token = sign(
      {
        payload.email,
      }, 
      secret, 
      { 
        expiresIn: MAX_AGE,
      });

    const serialized = serialize("OutSiteJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: MAX_AGE,
      path: "/",});

    const response = {
      message: "Authenticated!"
    }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Set-Cookie": serialized },
    });
  }
}
