import { connectDB } from "@/config/connectDB";
import Animals from "@/models/animals"; // Assuming the animal model is imported correctly
import Shelters from "@/models/shelters";

connectDB();

export const getFilteredAnimals = async (req, res) => {
  try {
    const { species, gender, minWeight, maxWeight, location } = req.query;

    // Build a query object
    const query = {};

    if (species) query.species = species;
    if (gender) query.gender = gender;
    if (minWeight && maxWeight)
      query.weight = { $gte: minWeight, $lte: maxWeight };

    // If location is provided, filter animals by shelter location
    if (location) {
      const shelters = await Shelters.find({
        $or: [
          { city: { $regex: location, $options: "i" } },
          { province: { $regex: location, $options: "i" } },
          { country: { $regex: location, $options: "i" } },
        ],
      }).select("_id");

      const shelterIds = shelters.map((shelter) => shelter._id);
      query.shelter = { $in: shelterIds };
    }

    // Fetch animals with the query
    const animals = await Animals.find(query).populate("shelter");

    res.json({ animals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching animals" });
  }
};
