import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/adopters/dashboard",
  "/adopters/search",
  "/adopters/profile",
  "/adopters/about",
  "/adopters/shelterList",
  "/adopters/lovelist",
  "/shelters/dashboard",
  "/shelters/profile",
  "/shelters/upload",
  "/shelters/requests",
];
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";
  if (!token && protectedRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}
