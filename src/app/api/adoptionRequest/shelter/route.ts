import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/connectDB";
import AdoptionRequest from "@/models/adoptionRequest";
import Animal from "@/models/animals";

// Ensure database connection
connectDB();

// GET request to fetch adoption requests for a specific shelter
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const shelterId = searchParams.get("shelterId");

    if (!shelterId) {
      return NextResponse.json({ success: false, message: "Missing required field: shelterId" }, { status: 400 });
    }

    // Find animals that belong to the shelter
    const animals = await Animal.find({ shelter: shelterId }).select("_id");

    if (!animals.length) {
      return NextResponse.json({ success: false, message: "No animals found for this shelter" }, { status: 404 });
    }

    const animalIds = animals.map((animal) => animal._id);

    // Find adoption requests for the animals that belong to the shelter
    const adoptionRequests = await AdoptionRequest.find({ animal: { $in: animalIds } });

    return NextResponse.json({ success: true, requests: adoptionRequests });
  } catch (error) {
    console.error("Error fetching adoption requests:", error);
    return NextResponse.json({ success: false, message: "An error occurred while fetching adoption requests." }, { status: 500 });
  }
}