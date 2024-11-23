import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Retrieve token from cookies
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Token not found", success: false },
      { status: 401 }
    );
  }

  return NextResponse.json({ token: token, success: true });
}

