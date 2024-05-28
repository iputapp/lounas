import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse, userAgent } from "next/server";

/** @see {@link https://nextjs.org/docs/app/building-your-application/routing/middleware} */
export async function middleware(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const requestPath = request.nextUrl.pathname;

  /** @see {@link https://supabase.com/docs/guides/auth/server-side/creating-a-client?environment=middleware&queryGroups=framework&framework=nextjs&queryGroups=environment} */
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  /** supabase client */
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  /** get supabase auth user */
  const auth = await supabase.auth.getUser();

  /** @see {@link https://nextjs.org/docs/messages/middleware-parse-user-agent} */
  const { device } = userAgent(request);
  console.log("device", device);

  /** signined */
  if (auth.data.user && !auth.error) {
    /** log */
    console.log("auth", {
      email: auth.data.user.email,
      expiredIn: (await supabase.auth.getSession()).data.session?.expires_in,
    });

    /** root */
    if (requestPath === "/") {
      return NextResponse.redirect(`${requestUrl.origin}/webapp`);
    }

    /** ----- auth ----- */
    /** /signup */
    if (requestPath.startsWith("/signup")) {
      return NextResponse.redirect(`${requestUrl.origin}/webapp`);
    }

    /** ----- app ----- */
    /** /webapp */
    if (requestPath.endsWith("/webapp")) {
      return NextResponse.redirect(`${requestUrl.origin}/webapp/home`);
    }

    /** /webapp/user */
    if (requestPath.endsWith("/signin")) {
      return NextResponse.redirect(`${requestUrl.origin}/webapp/user/signout`);
    }

    /** /recommend */
    if (requestPath.endsWith("/recommend")) {
      return NextResponse.redirect(`${requestUrl.origin}/recommend/explore`);
    }

    /** refreshing session */
    return response;
  } else {
    /** ----- root ----- */
    if (requestPath === "/") {
      if (device.type === "mobile") {
        return NextResponse.rewrite(`${requestUrl.origin}/mobile`);
      }
    }

    /** top page (mobile) */
    if (requestPath.endsWith("/mobile")) {
      if (device.type !== "mobile") {
        return NextResponse.redirect(`${requestUrl.origin}`);
      }
    }

    /** ----- auth ----- */
    /** /signup/verify */
    if (requestPath.endsWith("/verify")) {
      /** pending verification */
      if (!request.cookies.has("verify")) return NextResponse.redirect(`${requestUrl.origin}`);

      /** remove access permissions to the verify page */
      response.cookies.delete("verify");
      return response;
    }

    /** ----- settings ----- */
    /** /privacy */
    if (requestPath.startsWith("/privacy")) {
      return NextResponse.redirect(`${requestUrl.origin}`);
    }

    /** ----- app ----- */
    /** /webapp */
    if (requestPath.endsWith("/webapp")) {
      return NextResponse.redirect(`${requestUrl.origin}/webapp/user`);
    }

    /** /webapp/home */
    if (requestPath.endsWith("/home")) {
      return NextResponse.redirect(`${requestUrl.origin}/webapp/user`);
    }

    /** /webapp/user */
    if (requestPath.endsWith("/signout")) {
      return NextResponse.redirect(`${requestUrl.origin}/webapp/user/signin`);
    }

    /** /recommend */
    if (requestPath.startsWith("/recommend")) {
      return NextResponse.redirect(`${requestUrl.origin}`);
    }

    /** ----- data ----- */
    /** /restaurant */
    if (requestPath.startsWith("/restaurant")) {
      return NextResponse.redirect(`${requestUrl.origin}`);
    }
  }
}

export const config = {
  matcher: [
    // "/",
    // "/mobile/:path*",
    // "/signup/:path+",
    // "/privacy/:path*",
    // "/dish/:path*",
    // "/restaurant/:path*",
    // "/webapp/:path*",
    // "/recommend/:path*",
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
