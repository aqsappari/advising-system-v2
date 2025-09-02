// src/middleware.js
import { NextResponse } from "next/server";

// List all paths that require authentication
const protectedRoutes = ["/dashboard", "/profile", "/advising"];

export function middleware(request) {
  // Get the session cookie from the request
  const sessionCookie = request.cookies.get("session");
  const isProtectedRoute = protectedRoutes.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );
  const url = request.nextUrl.clone();

  // Condition 1: Redirect unauthenticated users from protected routes
  if (isProtectedRoute && !sessionCookie) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Condition 2: Redirect authenticated users from the home page
  if (sessionCookie && url.pathname === "/") {
    // Get the referrer (the page the user came from)
    const referrer = request.headers.get("referer");

    // Check if the referrer exists and is a valid internal URL
    if (referrer) {
      try {
        const referrerUrl = new URL(referrer);
        // Ensure the referrer is from the same site and not the root itself
        if (referrerUrl.origin === url.origin && referrerUrl.pathname !== "/") {
          return NextResponse.redirect(referrerUrl.href);
        }
      } catch (e) {
        // If there's an issue with the referrer URL, fall back to the dashboard
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      }
    }

    // If no valid referrer, redirect to the dashboard
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Allow the request to continue if no redirection is needed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", // Match the home page
    "/dashboard/:path*",
    "/profile/:path*",
    "/advising/:path*",
  ],
};
