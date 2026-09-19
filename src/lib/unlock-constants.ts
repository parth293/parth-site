/**
 * Shared between middleware.ts (edge runtime) and unlock.ts (server
 * components) — kept in its own file with no other imports so middleware's
 * bundle stays small.
 */
export const UNLOCK_COOKIE = "unlock";
export const UNLOCK_VALUE = "granted";
