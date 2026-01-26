import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "default_super_secret_key_change_me",
);

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const adminUser = process.env.ADMIN_USERNAME;
    const adminPassHash = process.env.ADMIN_PASSWORD;

    if (!adminUser || !adminPassHash) {
      console.error("Admin credentials not set in environment variables");
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, adminPassHash);

    console.log("Login Attempt:", {
      usernameProvided: username,
      expectedUser: adminUser,
      hashLength: adminPassHash?.length,
      passwordValid: isPasswordValid,
    });

    if (username === adminUser && isPasswordValid) {
      // Create JWT
      const token = await new SignJWT({ role: "admin" })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("24h")
        .sign(JWT_SECRET);

      const response = NextResponse.json({ success: true });

      // Set HTTP-only cookie
      response.cookies.set("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid credentials" },
      { status: 401 },
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
