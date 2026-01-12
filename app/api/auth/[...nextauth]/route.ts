import { handlers } from "@/auth";
import { loginRatelimit, getClientIp, rateLimitResponse } from "@/lib/rate-limit";
import { NextRequest } from "next/server";

const { GET, POST: originalPost } = handlers;

// Wrap POST handler with rate limiting for login attempts
async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { success, remaining } = await loginRatelimit.limit(ip);

  if (!success) {
    return rateLimitResponse(remaining);
  }

  return originalPost(request);
}

export { GET, POST };
