import { connectDB } from "@/config/connectDB";
import animals from "@/models/animals";
import { NextResponse } from "next/server";

connectDB();

export async function GET() {
  try {
    const animalsDB = await animals.find();
    console.log("Connected to the database. Animals found:", animalsDB.length);
    return NextResponse.json({
      message: "Animal list retrieved successfully",
      success: true,
      animals: animalsDB,
    });
  } catch (e) {
    console.error("Database error:", e); // Log any database error

    // Type assertion to tell TypeScript e is an Error
    const error = e as Error;

    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
