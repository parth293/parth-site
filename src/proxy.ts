import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UNLOCK_COOKIE, UNLOCK_VALUE } from "@/lib/unlock-constants";

/**
 * Visit any /notes/... URL with ?key=<PRIVATE_UNLOCK_KEY> once and this
 * browser gets a long-lived cookie that unlocks draft (private) notes —
 * see unlock.ts and content.ts's `includeDrafts` filter. Wrong or missing
 * key: request passes through unchanged, private notes stay invisible.
 */
const MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // 180 days

export function proxy(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");
  const secret = process.env.PRIVATE_UNLOCK_KEY;

  if (!key || !secret || key !== secret) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.searchParams.delete("key");
  const response = NextResponse.redirect(url);
  response.cookies.set(UNLOCK_COOKIE, UNLOCK_VALUE, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: MAX_AGE_SECONDS,
    path: "/",
  });
  return response;
}

export const config = {
  matcher: "/notes/:path*",
};
