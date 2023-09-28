import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * @param {NextRequest} request
 * @returns {NextResponse} redirect
 * @see {@link https://nextjs.org/docs/app/building-your-application/routing/middleware}
 */
export function middleware(request: NextRequest) {
  /** @example /signup/otp?pending */
  if (
    request.nextUrl.pathname.endsWith("/otp") &&
    request.nextUrl.searchParams.has(process.env.NEXT_PUBLIC_QUERY_SIGN_UP ?? "pending")
  ) {
    const value = request.cookies.get(process.env.NEXT_PUBLIC_COOKIE_SIGN_UP_NAME ?? "sign-up")
      ?.value;
    if (value === process.env.NEXT_PUBLIC_COOKIE_SIGN_UP_VALUE ?? "sign-up-success") {
      request.cookies.delete(process.env.NEXT_PUBLIC_COOKIE_SIGN_UP_NAME ?? "sign-up");
      return NextResponse.rewrite(new URL("/signup/otp", request.url));
    } else {
      request.cookies.delete(process.env.NEXT_PUBLIC_COOKIE_SIGN_UP_NAME ?? "sign-up");
      return NextResponse.redirect(new URL("/signup", request.url));
    }
  } else {
    request.cookies.delete(process.env.NEXT_PUBLIC_COOKIE_SIGN_UP_NAME ?? "sign-up");
    return NextResponse.redirect(new URL("/signup", request.url));
  }
}

export const config = {
  matcher: ["/signup/:path+"],
};
