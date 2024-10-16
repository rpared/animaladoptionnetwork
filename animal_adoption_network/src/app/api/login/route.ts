import Adopters from "@/models/adopters"; // Adjust the import path as needed
import Shelters from "@/models/shelters"; // Adjust the import path as needed
import bcrypt from "bcrypt"; // For hashing passwords
import { connectDB } from "@/config/connectDB";
import { NextResponse } from "next/server";

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

    // If login is successful
    return NextResponse.json(
      {
        success: true,
        message: `${
          userType.charAt(0).toUpperCase() + userType.slice(1)
        } logged in successfully.`,
        userType: user.userType,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during login." },
      { status: 500 }
    );
  }
}
