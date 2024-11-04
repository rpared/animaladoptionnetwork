// api/animals/individualAnimal/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/connectDB";
import Animals from "@/models/animals";
import mongoose from "mongoose";

connectDB();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const animalId = searchParams.get("id");

    if (!animalId || !mongoose.Types.ObjectId.isValid(animalId)) {
      return NextResponse.json(
        { message: "Invalid animal ID" },
        { status: 400 }
      );
    }

    const animal = await Animals.findById(animalId).populate("shelter");

    if (!animal) {
      return NextResponse.json(
        { message: "Animal not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(animal);
  } catch (error) {
    console.error("Error fetching animal:", error);
    return NextResponse.json(
      { message: "Error fetching animal" },
      { status: 500 }
    );
  }
}
