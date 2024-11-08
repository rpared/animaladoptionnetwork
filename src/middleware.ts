import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/adopters/dashboard",
  "/adopters/search",
  "/adopters/profile",
  "/adopters/about",
  "/adopters/shelterList",
  "/adopters/lovelist",
<<<<<<< HEAD
  "/adopters/requests",
  "/shelters/dashboard",
  "/shelters/profile",
  "/shelters/uploadAnimals",
=======
  "/shelters/dashboard",
  "/shelters/profile",
  "/shelters/upload",
>>>>>>> sara2
  "/shelters/requests",
];
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";
  if (!token && protectedRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}
