import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const protectedPath = "/editor";
  const isPathProtected = pathname === protectedPath;
  const res = NextResponse.next();
  if (isPathProtected) {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  return res;
}
