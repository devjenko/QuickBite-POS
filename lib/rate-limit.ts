import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = Redis.fromEnv();

// Rate limiter for login attempts (5 per minute)
export const loginRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  analytics: true,
  prefix: "ratelimit:login",
});

// Rate limiter for signup (5 per minute)
export const signupRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  analytics: true,
  prefix: "ratelimit:signup",
});

// Rate limiter for password verification (3 per 5 minutes - stricter)
export const passwordVerifyRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "5 m"),
  analytics: true,
  prefix: "ratelimit:verify",
});

// Helper function to get client IP address
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
  return ip;
}

// Helper to create rate limit error response
export function rateLimitResponse(remaining: number = 0) {
  return NextResponse.json(
    { error: "Too many requests. Please try again later." },
    {
      status: 429,
      headers: {
        "X-RateLimit-Remaining": remaining.toString(),
        "Retry-After": "60",
      },
    }
  );
}
