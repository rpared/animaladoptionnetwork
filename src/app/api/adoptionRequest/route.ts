import AdoptionRequest from "@/models/adoptionRequest";
import { connectDB } from "@/config/connectDB";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Connect to MongoDB
  await connectDB();

  try {
    const { adopterId, animalId, status } = await req.json(); // Parse the JSON body from the request

    // Create a new animal entry in the database
    const newAdoptionRequest = new AdoptionRequest({
      adopter: adopterId,
      animal: animalId,
      status
    });

    
    await newAdoptionRequest.save(); // Save the animal to MongoDB

    return NextResponse.json({
      message: "Adoption Request made successfully",
      animal: newAdoptionRequest,
    });
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
