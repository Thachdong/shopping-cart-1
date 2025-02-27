import withAuth from "next-auth/middleware";
import { EUserRoles } from "./constants";
import { User } from "next-auth";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname, origin } = req.nextUrl;
    const token = req.nextauth.token;
    const user = token?.user as User;
    const roles = user?.roles;

    const redirectUrl = new URL("/auth/login", origin);
    redirectUrl.searchParams.set("error", "permission-deny");
    redirectUrl.searchParams.set("callbackUrl", pathname);

    // If user is unauthorized, redirect to login with error message
    if (
      pathname.startsWith("/profile") &&
      !roles?.includes(EUserRoles.CUSTOMER)
    ) {
      return NextResponse.redirect(redirectUrl);
    }

    if (
      pathname.startsWith("/admin") &&
      !(roles?.includes(EUserRoles.ADMIN) || roles?.includes(EUserRoles.SELLER))
    ) {
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Ensure user is authenticated
    },
  },
);

export const config = {
  matcher: ["/profile/:path*", "/admin/:path*"],
};
