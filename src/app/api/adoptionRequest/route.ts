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

export async function GET() {
  // Connect to MongoDB
  await connectDB();

  try {
    // Fetch all adoption requests from the database
    const requests = await AdoptionRequest.find();

    return NextResponse.json({ success: true, requests });
  } catch (error) {
    console.error("Error fetching adoption requests:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while fetching adoption requests." },
      { status: 500 }
    );
  }
}



// PUT request to update the adoption request status and replyMessage
export async function PUT(req: Request) {
  await connectDB();

  try {
    // Get the request ID, status, and replyMessage from the request body
    const { id, status, replyMessage } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: id, status" },
        { status: 400 }
      );
    }

    // Find the adoption request by ID
    const adoptionRequest = await AdoptionRequest.findById(id);

    if (!adoptionRequest) {
      return NextResponse.json(
        { success: false, message: "Adoption request not found" },
        { status: 404 }
      );
    }

    // Update the adoption request's status and replyMessage
    adoptionRequest.status = status;
    adoptionRequest.replyMessage = replyMessage || "No reply message provided"; // Default message if none is provided

    // Save the updated adoption request
    await adoptionRequest.save();

    return NextResponse.json({
      success: true,
      message: "Adoption request updated successfully",
      adoptionRequest,
    });
  } catch (error) {
    console.error("Error updating adoption request:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while updating the adoption request." },
      { status: 500 }
    );
  }
}

