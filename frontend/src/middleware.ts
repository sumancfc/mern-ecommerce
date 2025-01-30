import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const isLoginPage = request.nextUrl.pathname === "/login";
  const isSignupPage = request.nextUrl.pathname === "/signup";

  // Allow access to signup and login pages if no token
  if (!token && (isLoginPage || isSignupPage)) {
    return NextResponse.next();
  }

  // Redirect to login if no token and trying to access protected routes
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If token exists but user is trying to access login/signup, redirect to home
  if (token && (isLoginPage || isSignupPage)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // For all other cases, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/login"],
};
