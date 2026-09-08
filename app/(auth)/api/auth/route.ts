import { auth } from "@/app/(auth)/auth";
import { NextResponse } from "next/server";

// In demo mode, skip auth for /api/auth/* routes
export async function GET(request: Request) {
  // Check if we're in demo mode
  if (process.env.IS_DEMO === "1") {
    // Return demo user info directly instead of using NextAuth
    return NextResponse.json({
      user: {
        id: "demo-user",
        name: "Demo Customer",
        email: "demo@customer-service.local",
        type: "guest",
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });
  }

  // Normal mode - use NextAuth
  const session = await auth();
  return NextResponse.json(session);
}

export async function POST(request: Request) {
  // In demo mode, accept any credentials and return demo user
  if (process.env.IS_DEMO === "1") {
    return NextResponse.json({
      user: {
        id: "demo-user",
        name: "Demo Customer",
        email: "demo@customer-service.local",
        type: "guest",
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });
  }

  // Normal mode - use NextAuth
  const session = await auth();
  return NextResponse.json(session);
}
