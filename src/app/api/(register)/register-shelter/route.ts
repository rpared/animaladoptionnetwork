import { connectDB } from "@/config/connectDB";
import Shelters from "@/models/shelters";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"; // To hash passwords

export async function POST(req: Request) {
  await connectDB(); // Connect to MongoDB

  try {
    const body = await req.json(); // Parse the incoming JSON data

    const {
      name,
      email,
      password,
      administratorFirstName,
      administratorLastName,
      province,
      city,
      address,
      charitableRegistrationNumber,
      operatingLicenseNumber,
      latitude,
      longitude,
    } = body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new shelter document
    const newShelter = new Shelters({
      name,
      email,
      password: hashedPassword, // Save the hashed password
      administratorFirstName,
      administratorLastName,
      province,
      city,
      address,
      charitableRegistrationNumber,
      operatingLicenseNumber,
      latitude,
      longitude,
    });

    await newShelter.save();

    return NextResponse.json(
      {
        success: true,
        message: "Shelter registered successfully!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Shelter registration error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during shelter registration.",
      },
      { status: 400 }
    );
  }
}
