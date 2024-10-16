import { NextResponse } from "next/server";
import { connectDB } from "@/config/connectDB";
import Adopter from "@/models/adopters";
import bcrypt from "bcrypt"; // For hashing passwords

// Handle the POST request for registering a new adopter
export async function POST(req: Request) {
  try {
    await connectDB(); // Connect to the MongoDB database

    const body = await req.json(); // Parse the incoming JSON data

    const {
      fname,
      lname,
      email,
      password,
      phone,
      province,
      city,
      address,
      householdSize,
      hasOtherPets,
      otherPetDetails,
    } = body;

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10); // Hash with a salt factor of 10

    // Create a new Adopter instance
    const newAdopter = new Adopter({
      fname,
      lname,
      email,
      password: hashedPassword, // Store the hashed password
      phone,
      province,
      city,
      address,
      householdSize,
      hasOtherPets,
      otherPetDetails,
    });

    // Save the adopter to the database
    await newAdopter.save();

    // Return a success response
    return NextResponse.json(
      { success: true, message: "Adopter registered successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering adopter:", error);
    return NextResponse.json(
      { success: false, message: "Registration failed." },
      { status: 500 }
    );
  }
}
