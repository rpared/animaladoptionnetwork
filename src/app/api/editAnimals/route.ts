import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/connectDB";
import Animals from "@/models/animals";
import mongoose from "mongoose";

// Connect to MongoDB
connectDB();

// PUT request handler to update animals
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    console.log("Updating animal with ID:", animalId);

    const formData = await req.formData();
    const name = formData.get("name");
    const species = formData.get("species");
    const breed = formData.get("breed");
    const age = formData.get("age");
    const weight = formData.get("weight");
    const gender = formData.get("gender");
    const description = formData.get("description");
    const medicalHistory = formData.get("medicalHistory");
    const isAdopted = formData.get("isAdopted") === "true";

    let shelter = formData.get("shelter");
    console.log("Received shelter ID:", shelter);
    if (shelter && typeof shelter === "object" && "_id" in shelter) {
      shelter = (shelter as { _id: string })._id || shelter.toString();
    } else if (typeof shelter !== "string") {
      throw new Error("Invalid shelter ID");
    }

    if (shelter && !mongoose.Types.ObjectId.isValid(shelter)) {
      throw new Error("Invalid shelter ID");
    }

    const photoField = formData.get("photo");
    let photo = null;

    if (photoField) {
      const buffer = Buffer.from(await (photoField as Blob).arrayBuffer());
      const base64String = buffer.toString("base64");
      photo = {
        data: base64String,
        contentType: (photoField as Blob).type,
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {
      ...(name && { name }),
      ...(species && { species }),
      ...(breed && { breed }),
      ...(age && { age }),
      ...(weight && { weight }),
      ...(gender && { gender }),
      ...(description && { description }),
      ...(medicalHistory && { medicalHistory }),
      ...(shelter && { shelter }), // Only if it's valid
      isAdopted,
      ...(photo && { photos: [photo] }),
    };

    const updatedAnimal = await Animals.findByIdAndUpdate(
      new mongoose.Types.ObjectId(animalId),
      updateData,
      { new: true }
    );

    if (!updatedAnimal) {
      throw new Error("Animal not found");
    }

    return NextResponse.json({
      message: "Animal updated successfully",
      animal: updatedAnimal,
    });
  } catch (error) {
    console.error("Error updating animal:", error);
    return NextResponse.json(
      { message: "Failed to update animal", error: (error as Error).message },
      { status: 500 }
    );
  }
}

// // Working version, just failed to deply in vercel
// import { NextResponse } from "next/server";
// import { connectDB } from "@/config/connectDB";
// import Animals from "@/models/animals";
// import mongoose from "mongoose";

// // Connect to MongoDB
// connectDB();

// // PUT request handler to update animals
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export async function PUT(req: { url: string | URL; formData: () => any }) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const animalId = searchParams.get("animalId");
//     if (!animalId) {
//       throw new Error("Animal ID is required");
//     }

//     console.log("Updating animal with ID:", animalId);

//     const formData = await req.formData();
//     const name = formData.get("name");
//     const species = formData.get("species");
//     const breed = formData.get("breed");
//     const age = formData.get("age");
//     const weight = formData.get("weight");
//     const gender = formData.get("gender");
//     const description = formData.get("description");
//     const medicalHistory = formData.get("medicalHistory");
//     const isAdopted = formData.get("isAdopted") === "true";

//     let shelter = formData.get("shelter");
//     console.log("Received shelter ID:", shelter);
//     if (shelter && typeof shelter === "object") {
//       shelter = shelter._id || shelter.toString();
//     } else if (typeof shelter !== "string") {
//       throw new Error("Invalid shelter ID");
//     }

//     if (shelter && !mongoose.Types.ObjectId.isValid(shelter)) {
//       throw new Error("Invalid shelter ID");
//     }

//     const photoField = formData.get("photo");
//     let photo = null;

//     if (photoField) {
//       const buffer = Buffer.from(await photoField.arrayBuffer());
//       const base64String = buffer.toString("base64");
//       photo = {
//         data: base64String,
//         contentType: photoField.type,
//       };
//     }

//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const updateData: any = {
//       ...(name && { name }),
//       ...(species && { species }),
//       ...(breed && { breed }),
//       ...(age && { age }),
//       ...(weight && { weight }),
//       ...(gender && { gender }),
//       ...(description && { description }),
//       ...(medicalHistory && { medicalHistory }),
//       ...(shelter && { shelter }), // Only if it's valid
//       isAdopted,
//       ...(photo && { photos: [photo] }),
//     };

//     const updatedAnimal = await Animals.findByIdAndUpdate(
//       new mongoose.Types.ObjectId(animalId),
//       updateData,
//       { new: true }
//     );

//     if (!updatedAnimal) {
//       throw new Error("Animal not found");
//     }

//     return NextResponse.json({
//       message: "Animal updated successfully",
//       animal: updatedAnimal,
//     });
//   } catch (error) {
//     console.error("Error updating animal:", error);
//     return NextResponse.json(
//       { message: "Failed to update animal", error: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }
