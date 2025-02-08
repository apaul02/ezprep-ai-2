import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Simple in-memory rate limiting
const rateLimits = new Map<string, { count: number; timestamp: number }>();

export async function rateLimit(identifier: string, limit: number = 5, windowMs: number = 60000) {
  const now = Date.now();
  const userRateLimit = rateLimits.get(identifier);

  if (!userRateLimit || (now - userRateLimit.timestamp) > windowMs) {
    rateLimits.set(identifier, { count: 1, timestamp: now });
    return { success: true };
  }

  if (userRateLimit.count >= limit) {
    return { success: false };
  }

  userRateLimit.count += 1;
  return { success: true };
}

// Function to format date
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}
