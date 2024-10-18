import Adopters from "@/models/adopters"; // Adjust the import path as needed
import Shelters from "@/models/shelters"; // Adjust the import path as needed
import bcrypt from "bcrypt"; // For hashing passwords
import { connectDB } from "@/config/connectDB";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  // Connect to MongoDB
  await connectDB();

  try {
    const { userType, email, password } = await req.json(); // Parse the JSON body from the request

    let user;
    if (userType === "adopter") {
      // Find adopter by email
      user = await Adopters.findOne({ email });
    } else if (userType === "shelter") {
      // Find shelter by email
      user = await Shelters.findOne({ email });
    }

    // If user is not found, return an error response
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    // Compare the plain text password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials." },
        { status: 400 }
      );
    }

    const payload = {
      user: {
        // userType: user.type,
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        fname: user.fname,
      },
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: 36000,
    });
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      user: user,
      token: token,
      userType: user.userType,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    // If login is successful
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during login." },
      { status: 500 }
    );
  }
}

// export interface CustomJwtPayload extends jwt.JwtPayload {
//   id: string; // or number, depending on your implementation
// }
