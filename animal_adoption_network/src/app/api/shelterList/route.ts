// /api/shelterList/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/connectDB";
import Shelters from "@/models/shelters";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  await connectDB(); // Connect to the database

  try {
    // Fetch all shelters from the database
    const shelterList = await Shelters.find({}, "-password"); // Exclude the password field

    // Return the shelter list details
    return NextResponse.json({
      success: true,
      shelterList,
    });
  } catch (error) {
    console.error("Could not retrieve list of Shelters", error);
    return NextResponse.json(
      { message: "Error retrieving shelter list", success: false },
      { status: 500 }
    );
  }
}
