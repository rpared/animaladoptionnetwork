import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/connectDB";
import Animals from "@/models/animals";
import Shelters from "@/models/shelters";
import mongoose from "mongoose";

// Ensure database connection
connectDB();

interface QueryParams {
  species?: string;
  gender?: string;
  weight?: { $gte?: number; $lte?: number };
  shelter?:
    | mongoose.Types.ObjectId
    | { $in: mongoose.Types.ObjectId[] }
    | undefined;
<<<<<<< HEAD
  animalId?: string;
}
// Display Animals
=======
}

>>>>>>> sara2
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const species = searchParams.get("species");
    const gender = searchParams.get("gender");
    const minWeight = searchParams.get("minWeight");
    const maxWeight = searchParams.get("maxWeight");
    const location = searchParams.get("location");
    const shelterId = searchParams.get("shelterId");

    // Initialize the query object
    const query: QueryParams = {};

    if (species) query.species = species;
    if (gender) query.gender = gender;

    if (minWeight || maxWeight) {
      query.weight = {};
      if (minWeight) query.weight.$gte = Number(minWeight);
      if (maxWeight) query.weight.$lte = Number(maxWeight);
    }

    if (shelterId) {
      query.shelter = new mongoose.Types.ObjectId(shelterId);
    }

    // Debug shelter location filtering
    if (location) {
      console.log("Location search: ", location);
      try {
        const shelters = await Shelters.find({
          $or: [
            { city: { $regex: location, $options: "i" } },
            { province: { $regex: location, $options: "i" } },
          ],
        }).select("_id");

        console.log("Found shelters: ", shelters);
        const shelterIds = shelters.map((shelter) => shelter._id);

        if (shelterIds.length === 0) {
          console.log("No shelters found for location:", location);
          return NextResponse.json({ animals: [] });
        }

        query.shelter = { $in: shelterIds };
      } catch (shelterError) {
        console.error("Error fetching shelters:", shelterError);
        throw shelterError;
      }
    }

    // Fetch animals based on the query and populate shelter data
    console.log("Querying animals with: ", query);
    const animals = await Animals.find(query).populate("shelter");

    console.log("Found animals: ", animals);

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

<<<<<<< HEAD
// Delete Animal
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const animalId = searchParams.get("id");

    if (!animalId) {
      return NextResponse.json(
        { message: "Animal ID is required" },
        { status: 400 }
      );
    }

    // Attempt to delete the animal
    const deletedAnimal = await Animals.findByIdAndDelete(
      new mongoose.Types.ObjectId(animalId)
    );

    if (!deletedAnimal) {
      return NextResponse.json(
        { message: "Animal not found or already deleted" },
        { status: 404 }
      );
    }

    // Successfully deleted
    return NextResponse.json(
      { message: "Animal successfully deleted", animalId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting animal", error);
    return NextResponse.json(
      { message: "Error deleting animal" },
      { status: 500 }
    );
  }
}

=======
>>>>>>> sara2
//Original working code
// import { NextRequest, NextResponse } from "next/server";
// import { connectDB } from "@/config/connectDB";
// import Animals from "@/models/animals";
// import Shelters from "@/models/shelters";

// // Ensure database connection
// connectDB();

// interface QueryParams {
//   species?: string;
//   gender?: string;
//   weight?: { $gte?: number; $lte?: number };
//   shelter?: { $in: string[] };
// }

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const species = searchParams.get("species");
//     const gender = searchParams.get("gender");
//     const minWeight = searchParams.get("minWeight");
//     const maxWeight = searchParams.get("maxWeight");
//     const location = searchParams.get("location");

//     // Initialize the query object
//     const query: QueryParams = {};

//     if (species) query.species = species;
//     if (gender) query.gender = gender;

//     if (minWeight || maxWeight) {
//       query.weight = {};
//       if (minWeight) query.weight.$gte = Number(minWeight);
//       if (maxWeight) query.weight.$lte = Number(maxWeight);
//     }

//     // Debug shelter location filtering
//     if (location) {
//       console.log("Location search: ", location);
//       try {
//         const shelters = await Shelters.find({
//           $or: [
//             { city: { $regex: location, $options: "i" } },
//             { province: { $regex: location, $options: "i" } },
//           ],
//         }).select("_id");

//         console.log("Found shelters: ", shelters);
//         const shelterIds: string[] = shelters.map(
//           (shelter: { _id: { toString: () => string } }) =>
//             shelter._id.toString()
//         );

//         if (shelterIds.length === 0) {
//           console.log("No shelters found for location:", location);
//           return NextResponse.json({ animals: [] });
//         }

//         query.shelter = { $in: shelterIds };
//       } catch (shelterError) {
//         console.error("Error fetching shelters:", shelterError);
//         throw shelterError;
//       }
//     }

//     // Fetch animals based on the query and populate shelter data
//     console.log("Querying animals with: ", query);
//     const animals = await Animals.find(query).populate("shelter");

//     console.log("Found animals: ", animals);

//     // Return the animals in a NextResponse object
//     return NextResponse.json({ animals });
//   } catch (error) {
//     console.error("Error fetching animals:", error);
//     return NextResponse.json(
//       { message: "Error fetching animals" },
//       { status: 500 }
//     );
//   }
// }
