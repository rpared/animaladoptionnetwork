// api/updateAdoptionStatus/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/connectDB";
import Animals from "@/models/animals";
import mongoose from "mongoose";

connectDB();

// PUT request handler for updating isAdopted status
export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const animalId = searchParams.get("animalId");

    if (!animalId || !mongoose.Types.ObjectId.isValid(animalId)) {
      return NextResponse.json(
        { message: "Invalid animal ID" },
        { status: 400 }
      );
    }

    const { isAdopted } = await req.json(); // Expecting a JSON body with { isAdopted: true|false }

    const updatedAnimal = await Animals.findByIdAndUpdate(
      animalId,
      { isAdopted },
      { new: true }
    );

    if (!updatedAnimal) {
      return NextResponse.json(
        { message: "Animal not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: `Animal's adoption status updated successfully`,
      animal: updatedAnimal,
    });
  } catch (error) {
    console.error("Error updating adoption status:", error);
    return NextResponse.json(
      { message: "Failed to update adoption status", error: (error as Error).message },
      { status: 500 }
    );
  }
}
