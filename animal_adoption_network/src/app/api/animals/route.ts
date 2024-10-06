import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/connectDB";
import Animals from "@/models/animals";
import Shelters from "@/models/shelters";

// Ensure database connection
connectDB();

// Interface for the query parameters
interface QueryParams {
  species?: string;
  gender?: string;
  weight?: { $gte?: number; $lte?: number };
  shelter?: { $in: string[] };
}

// The GET handler for filtering animals
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const species = searchParams.get("species");
    const gender = searchParams.get("gender");
    const minWeight = searchParams.get("minWeight");
    const maxWeight = searchParams.get("maxWeight");
    const location = searchParams.get("location");

    // Initialize the query object
    const query: QueryParams = {};

    if (species) query.species = species;
    if (gender) query.gender = gender;

    // Handle weight range (both values are optional)
    if (minWeight || maxWeight) {
      query.weight = {};
      if (minWeight) query.weight.$gte = Number(minWeight);
      if (maxWeight) query.weight.$lte = Number(maxWeight);
    }

    // Filter by shelter location, if provided
    if (location) {
      const shelters = await Shelters.find({
        $or: [
          { city: { $regex: location, $options: "i" } },
          { province: { $regex: location, $options: "i" } },
          { country: { $regex: location, $options: "i" } },
        ],
      }).select("_id");

      const shelterIds = shelters.map((shelter) => shelter._id.toString());
      query.shelter = { $in: shelterIds };
    }

    // Fetch animals based on the query and populate shelter data
    const animals = await Animals.find(query).populate("shelter");

    // Return the animals in a NextResponse object
    return NextResponse.json({ animals });
  } catch (error) {
    console.error("Error fetching animals:", error);
    return NextResponse.json(
      { message: "Error fetching animals" },
      { status: 500 }
    );
  }
}
