import AdoptionRequest from "@/models/adoptionRequest";
import { connectDB } from "@/config/connectDB";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Connect to MongoDB
  await connectDB();

  try {
    // Parse the JSON body from the request
    const {
      adopterId,
      animalId,
      status,
      fname,
      lname,
      email,
      phone,
      id,
      address,
      householdSize,
      hasOtherPets,
      salaryRange,
      personalReference,
      personalReferencePhone,
    } = await req.json();

    // Create a new adoption request entry in the database with the provided data
    const newAdoptionRequest = new AdoptionRequest({
      adopter: adopterId,
      animal: animalId,
      status,
      fname,
      lname,
      email,
      phone,
      id,
      address,
      householdSize,
      hasOtherPets,
      salaryRange,
      personalReference,
      personalReferencePhone,
    });

    await newAdoptionRequest.save(); // Save the adoption request to MongoDB

    return NextResponse.json({
      message: "Adoption Request made successfully",
      animal: newAdoptionRequest,
    });
  } catch (error) {
    console.error("Adoption request error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while processing the adoption request." },
      { status: 500 }
    );
  }
}
