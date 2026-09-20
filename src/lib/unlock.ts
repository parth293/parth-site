import { cookies } from "next/headers";
import { UNLOCK_COOKIE, UNLOCK_VALUE } from "./unlock-constants";

/**
 * True once this browser has visited a /notes/... URL with
 * ?key=<PRIVATE_UNLOCK_KEY> — see middleware.ts, which sets the cookie this
 * checks. Not real auth: an unlisted, locked corner for personal notes that
 * stay in git but out of the public build.
 */
export async function isUnlocked(): Promise<boolean> {
  const store = await cookies();
  return store.get(UNLOCK_COOKIE)?.value === UNLOCK_VALUE;
}
