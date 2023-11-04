import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse, userAgent } from "next/server";

/** @see {@link https://nextjs.org/docs/app/building-your-application/routing/middleware} */
export async function middleware(req: NextRequest) {
  const reqUrl = new URL(req.url);
  const reqNextPath = req.nextUrl.pathname;
  /** supabase auth session */
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const session = await supabase.auth.getSession();

  console.log("session", {
    email: session.data.session?.user.email,
    expiredIn: session.data.session?.expires_in,
  });

  /** @see {@link https://nextjs.org/docs/messages/middleware-parse-user-agent} */
  const { device } = userAgent(req);
  console.log("device", device);

  /** signined */
  if (session.data.session) {
    /** root */
    if (reqNextPath === "/") {
      return NextResponse.redirect(`${reqUrl.origin}/webapp`);
    }

    /** ----- auth ----- */
    /** /signup */
    if (reqNextPath.startsWith("/signup")) {
      return NextResponse.redirect(`${reqUrl.origin}/webapp`);
    }

    /** ----- app ----- */
    /** /webapp */
    if (reqNextPath.endsWith("/webapp")) {
      return NextResponse.redirect(`${reqUrl.origin}/webapp/home`);
    }

    /** /webapp/user */
    if (reqNextPath.endsWith("/signin")) {
      return NextResponse.redirect(`${reqUrl.origin}/webapp/user/signout`);
    }
  } else {
    /** ----- root ----- */
    if (reqNextPath === "/") {
      if (device.type === "mobile") {
        return NextResponse.rewrite(`${reqUrl.origin}/mobile`);
      }
    }

    /** top page (mobile) */
    if (reqNextPath.endsWith("/mobile")) {
      if (device.type !== "mobile") {
        return NextResponse.redirect(`${reqUrl.origin}`);
      }
    }

    /** ----- auth ----- */
    /** /signup/verify */
    if (reqNextPath.endsWith("/verify")) {
      /** pending verification */
      if (!req.cookies.has("verify")) return NextResponse.redirect(`${reqUrl.origin}`);

      /** remove access permissions to the verify page */
      res.cookies.delete("verify");
      return res;
    }

    /** ----- settings ----- */
    /** /privacy */
    if (reqNextPath.startsWith("/privacy")) {
      return NextResponse.redirect(`${reqUrl.origin}`);
    }

    /** ----- app ----- */
    /** /webapp */
    if (reqNextPath.endsWith("/webapp")) {
      return NextResponse.redirect(`${reqUrl.origin}/webapp/user`);
    }

    /** /webapp/home */
    if (reqNextPath.endsWith("/home")) {
      return NextResponse.redirect(`${reqUrl.origin}/webapp/user`);
    }

    /** /webapp/user */
    if (reqNextPath.endsWith("/signout")) {
      return NextResponse.redirect(`${reqUrl.origin}/webapp/user/signin`);
    }

    /** /recommend */
    if (reqNextPath.startsWith("/recommend")) {
      return NextResponse.redirect(`${reqUrl.origin}`);
    }

    /** ----- data ----- */
    /** /restaurant */
    if (reqNextPath.startsWith("/restaurant")) {
      return NextResponse.redirect(`${reqUrl.origin}`);
    }
  }

  /** refreshing session */
  return res;
}

export const config = {
  matcher: [
    "/",
    "/mobile/:path*",
    "/signup/:path+",
    "/privacy/:path*",
    "/dish/:path*",
    "/restaurant/:path*",
    "/webapp/:path*",
    "/recommend/:path*",
  ],
};
