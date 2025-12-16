import { auth } from "./auth";
import { NextResponse } from "next/server";

export async function proxy(request: Request) {
  const session = await auth();

  // If there is no valid session, return the user to the login page
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
