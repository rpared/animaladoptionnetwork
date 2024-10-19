// /api/userInfo/route.ts

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/config/connectDB";
import Shelters from "@/models/shelters";
import { CustomJwtPayload } from "@/types/jwt";
import Adopters from "@/models/adopters";

// Replace with your own secret key
const JWT_SECRET = process.env.JWT_SECRET || "this_is_a_rough_subject";

export async function GET(req: NextRequest) {
  await connectDB(); // Connect to the database

  // Retrieve token from cookies
  const token = req.cookies.get("token")?.value;
  console.log("userInfoFile Token:", token); // Check if the token is actually being sent

  if (!token) {
    return NextResponse.json(
      { message: "Token not found", success: false },
      { status: 401 }
    );
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
    if (decoded.user.userType == "shelter") {
      // Fetch user data based on user ID from the token
      const user = await Shelters.findById(decoded.user.id);
      if (!user) {
        return NextResponse.json(
          { message: "User not found", success: false },
          { status: 404 }
        );
      }

      // Return shelter user details
      return NextResponse.json({
        success: true,
        user: user, // Safely accessing 'user' here
      });
    }
    if (decoded.user.userType == "adopter") {
      // Fetch user data based on user ID from the token
      const user = await Adopters.findById(decoded.user.id);
      if (!user) {
        return NextResponse.json(
          { message: "User not found", success: false },
          { status: 404 }
        );
      }

      // Return shelter user details
      return NextResponse.json({
        success: true,
        user: user, // Safely accessing 'user' here
      });
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json(
      { message: "Invalid token", success: false },
      { status: 403 }
    );
  }
}

export async function PUT(req: NextRequest) {
  await connectDB();

  // Retrieve token from cookies
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Token not found", success: false },
      { status: 401 }
    );
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
    const { name, email } = await req.json(); // Get data from the request body

    // Update user data
    const updatedUser = await Shelters.findByIdAndUpdate(
      decoded.user.id,
      { name, email }, // Add other fields as necessary
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Invalid token or update failed", success: false },
      { status: 403 }
    );
  }
}
