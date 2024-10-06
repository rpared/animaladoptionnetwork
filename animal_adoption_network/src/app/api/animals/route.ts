import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/config/connectDB";
import Animals from "@/models/animals";
import Shelters from "@/models/shelters";

// Ensure database connection
connectDB();

interface QueryParams {
  species?: string;
  gender?: string;
  weight?: { $gte?: number; $lte?: number };
  shelter?: { $in: string[] };
}

export const getFilteredAnimals = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { species, gender, minWeight, maxWeight, location } = req.query;

    // Initialize a query object with a specific type
    const query: QueryParams = {};

    // Add filtering conditions based on query parameters
    if (species) query.species = species as string;
    if (gender) query.gender = gender as string;

    // Handle weight range (both values are optional)
    if (minWeight || maxWeight) {
      query.weight = {};
      if (minWeight) query.weight.$gte = Number(minWeight);
      if (maxWeight) query.weight.$lte = Number(maxWeight);
    }

    // Filter by location, if provided
    if (location) {
      const shelters = await Shelters.find({
        $or: [
          { city: { $regex: location as string, $options: "i" } },
          { province: { $regex: location as string, $options: "i" } },
          { country: { $regex: location as string, $options: "i" } },
        ],
      }).select("_id");

      const shelterIds = shelters.map((shelter) => shelter._id.toString());
      query.shelter = { $in: shelterIds };
    }

    // Fetch animals based on the built query, and populate shelter data
    const animals = await Animals.find(query).populate("shelter");

    // Return the filtered animals as a response
    res.status(200).json({ animals });
  } catch (error) {
    console.error("Error fetching animals:", error);
    res.status(500).json({ message: "Error fetching animals" });
  }
};

export default getFilteredAnimals;
