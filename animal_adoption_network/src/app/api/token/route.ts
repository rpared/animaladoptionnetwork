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

// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   try {
//     const token = request.cookies.get("token")?.value || "";
//     if (token) {
//       return NextResponse.json({ status: true });
//     }

//     return NextResponse.json({
//       status: false,
//     });
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
