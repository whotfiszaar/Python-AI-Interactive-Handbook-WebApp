import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

const SESSION_SECRET = process.env.SESSION_SECRET || "python-ai-handbook-super-secret-salt-2026";

/**
 * Hash a password using PBKDF2 with a secure random salt.
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

/**
 * Verify a password against its stored hash.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  const parts = storedHash.split(":");
  if (parts.length !== 2) return false;
  const [salt, hash] = parts;
  const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return hash === verifyHash;
}

/**
 * Sign a session payload to generate a secure token.
 */
export function signToken(payload: { userId: number; username: string; name: string }): string {
  const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
  const tokenData = {
    ...payload,
    expiresAt,
  };
  
  const encodedData = Buffer.from(JSON.stringify(tokenData)).toString("base64");
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(encodedData)
    .digest("base64");
    
  return `${encodedData}.${signature}`;
}

/**
 * Verify a signed session token. Returns the payload if valid, otherwise null.
 */
export function verifyToken(token: string): { userId: number; username: string; name: string } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const [encodedData, signature] = parts;
    
    const expectedSignature = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(encodedData)
      .digest("base64");
      
    if (signature !== expectedSignature) return null;
    
    const tokenData = JSON.parse(Buffer.from(encodedData, "base64").toString("utf-8"));
    if (tokenData.expiresAt < Date.now()) {
      return null; // Expired
    }
    
    return {
      userId: tokenData.userId,
      username: tokenData.username,
      name: tokenData.name,
    };
  } catch {
    return null;
  }
}

/**
 * Extract and verify user session from a NextRequest.
 */
export function getSessionUser(req: NextRequest): { userId: number; username: string; name: string } | null {
  const sessionCookie = req.cookies.get("session")?.value;
  if (!sessionCookie) return null;
  return verifyToken(sessionCookie);
}

/**
 * Set session cookie in response headers.
 */
export function setSessionCookie(res: NextResponse, payload: { userId: number; username: string; name: string }) {
  const token = signToken(payload);
  res.cookies.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });
}

/**
 * Clear session cookie.
 */
export function clearSessionCookie(res: NextResponse) {
  res.cookies.set("session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
