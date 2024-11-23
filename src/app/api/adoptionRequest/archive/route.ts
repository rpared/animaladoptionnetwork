import AdoptionRequest from "@/models/adoptionRequest";
import { connectDB } from "@/config/connectDB";
import { NextRequest, NextResponse } from "next/server";

// Ensure database connection
connectDB();

// PUT request to archive the adoption request
export async function PUT(req: NextRequest) {
  await connectDB();

  try {
    const { id, isArchived } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing required field: id" },
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

    // Update the isArchived field
    adoptionRequest.isArchived = isArchived;

    // Save the updated adoption request
    await adoptionRequest.save();

    return NextResponse.json({
      success: true,
      message: "Adoption request archived successfully",
      adoptionRequest,
    });
  } catch (error) {
    console.error("Error archiving adoption request:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while archiving the adoption request." },
      { status: 500 }
    );
  }
}