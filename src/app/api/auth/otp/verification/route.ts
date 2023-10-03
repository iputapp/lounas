import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// import { sign } from "jsonwebtoken";
// import { serialize } from "cookie";
import type { Verification } from ".";
import { verificationSchema } from ".";

/** @see{@link https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config} */
export const dynamic = "force-dynamic";

const onlyPasswordSchema = verificationSchema.pick({ password: true });

export async function POST(request: Request) {
  const body = (await request.json()) as Promise<Verification>;
  const payload = onlyPasswordSchema.safeParse(body);

  console.log("payload-verify", payload);

  if (!payload.success) return NextResponse.error();

  const cookieStore = cookies();
  const email = cookieStore.get("email");
  console.log(email);

  if (!email) return NextResponse.error();

  const supabase = createRouteHandlerClient({ cookies });
  const { data, error } = await supabase.auth.verifyOtp({
    type: "email",
    email: String(email),
    token: payload.data.password,
    options: {
      redirectTo: `${new URL(request.url).origin}/api/auth/callback`,
    },
  });

  if (error || !data) return NextResponse.error();

  // const secret = process.env.JWT_SECRET;
  // const token = sign(
  //   {
  //     payload.email,
  //   },
  //   secret,
  //   {
  //     expiresIn: MAX_AGE,
  //   });

  // const serialized = serialize("OutSiteJWT", token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "strict",
  //   maxAge: MAX_AGE,
  //   path: "/",});

  return NextResponse.json({ message: "authenticated" });
}
