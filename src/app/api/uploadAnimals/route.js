// Latest version that is not working for photos ugh:
import { NextResponse } from "next/server";
import multer from "multer";
import { connectDB } from "@/config/connectDB";
import Animals from "@/models/animals";

// Connect to your database
connectDB();

// Multer setup for file upload
const upload = multer({
  storage: multer.memoryStorage(), // Use memoryStorage to handle file as buffer
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

const uploadMiddleware = upload.single("photo"); // Middleware to handle single file upload

// Helper function to convert multer to promise (to use async/await)
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// POST request handler to upload animals
export async function POST(req) {
  // Create a new Response object to handle `req` with multer
  console.log("The Request:", req);
  const res = new NextResponse();
  try {
    // Run the multer middleware to handle file upload
    await runMiddleware(req, res, uploadMiddleware);

    console.log("Multer processed file:", req.file);

    // Access form data from the request
    const formData = await req.formData();

    // Extract animal data fields from formData
    const name = formData.get("name");
    const species = formData.get("species");
    const breed = formData.get("breed");
    const age = formData.get("age");
    const weight = formData.get("weight");
    const gender = formData.get("gender");
    const description = formData.get("description");
    const medicalHistory = formData.get("medicalHistory");
    const isAdopted = formData.get("isAdopted");
    const shelter = formData.get("shelter");

    // Extract file data and store as Buffer with contentType
    const photo = req.file
      ? { data: req.file.buffer, contentType: req.file.mimetype }
      : null;

    // Log the uploaded file for debugging
    console.log("Uploaded file:", photo);

    // Create a new animal entry in the database
    const newAnimal = new Animals({
      name,
      species,
      breed,
      age,
      weight,
      gender,
      description,
      medicalHistory,
      isAdopted,
      shelter,
      photos: [photo], // Ensure photos is an array
      // photos: photo ? [photo] : [], // Ensure photos is an array, even if empty
    });

    await newAnimal.save(); // Save the animal to MongoDB

    return NextResponse.json({
      message: "Animal uploaded successfully",
      animal: newAnimal,
    });
  } catch (error) {
    console.error("Error uploading animal:", error);
    return NextResponse.json(
      { message: "Failed to upload animal" },
      { status: 500 }
    );
  }
}

// Disable Next.js bodyParser as multer handles it
export const config = {
  api: {
    bodyParser: false,
  },
};

//FAiled attempt to store locally
// import { NextResponse } from "next/server";
// import { connectDB } from "@/config/connectDB";
// import Animals from "@/models/animals";
// import path from "path";
// import fs from "fs";
// import formidable from "formidable";
// import getRawBody from "raw-body";

// // Connect to your database
// connectDB();

// // Set up formidable for handling file uploads
// export const config = {
//   api: {
//     bodyParser: false, // Disable Next.js built-in bodyParser, as formidable will handle it
//   },
// };

// export async function POST(req) {
//   try {
//     // Extract the raw body of the request
//     const rawBody = await getRawBody(req);

//     // Use formidable to parse the incoming form-data request
//     const form = formidable({
//       uploadDir: path.join(process.cwd(), "public", "uploads"), // Directory for uploads
//       keepExtensions: true, // Keep file extensions
//       maxFileSize: 5 * 1024 * 1024, // Limit file size to 5 MB
//       multiples: false, // Single file upload
//     });

//     const data = await new Promise((resolve, reject) => {
//       form.parse(rawBody, (err, fields, files) => {
//         if (err) return reject(err);
//         resolve({ fields, files });
//       });
//     });

//     const {
//       name,
//       species,
//       breed,
//       age,
//       weight,
//       gender,
//       description,
//       medicalHistory,
//       isAdopted,
//       shelter,
//     } = data.fields;
//     const { photo } = data.files;

//     if (!photo) {
//       return NextResponse.json(
//         { message: "No photo uploaded" },
//         { status: 400 }
//       );
//     }

//     // Save the uploaded photo path
//     const photoPath = `/uploads/${path.basename(photo.filepath)}`;

//     // Create a new animal entry in the database
//     const newAnimal = new Animals({
//       name,
//       species,
//       breed,
//       age,
//       weight,
//       gender,
//       description,
//       medicalHistory,
//       isAdopted,
//       shelter,
//       photos: [{ path: photoPath, contentType: photo.mimetype }], // Store the relative path and content type
//     });

//     await newAnimal.save(); // Save the animal data to MongoDB

//     return NextResponse.json({
//       message: "Animal uploaded successfully",
//       animal: newAnimal,
//     });
//   } catch (error) {
//     console.error("Error uploading animal:", error);
//     return NextResponse.json(
//       { message: "Failed to upload animal" },
//       { status: 500 }
//     );
//   }
// }

// FAiled attempt with Formidable and Azure Blob Storage
// import { NextResponse } from "next/server";
// import { connectDB } from "@/config/connectDB";
// import Animals from "@/models/animals";
// import { BlobServiceClient } from "@azure/storage-blob";
// import formidable from "formidable";
// import path from "path";
// import fs from "fs";

// // Connect to your database
// connectDB();

// // Set up formidable for handling file uploads
// export const config = {
//   api: {
//     bodyParser: false, // Disable Next.js built-in bodyParser, as formidable will handle it
//   },
// };

// export async function POST(req) {
//   try {
//     // Use formidable to parse the incoming form-data request
//     const form = new formidable.IncomingForm({
//       uploadDir: path.join(process.cwd(), "public", "uploads"), // Directory for uploads
//       keepExtensions: true, // Keep file extensions
//       maxFileSize: 5 * 1024 * 1024, // Limit file size to 5 MB
//       multiples: false, // Single file upload
//     });

//     const data = await new Promise((resolve, reject) => {
//       form.parse(req, (err, fields, files) => {
//         if (err) return reject(err);
//         resolve({ fields, files });
//       });
//     });

//     const {
//       name,
//       species,
//       breed,
//       age,
//       weight,
//       gender,
//       description,
//       medicalHistory,
//       isAdopted,
//       shelter,
//     } = data.fields;
//     const { photo } = data.files;

//     if (!photo) {
//       return NextResponse.json(
//         { message: "No photo uploaded" },
//         { status: 400 }
//       );
//     }

//     // Read the file from the local filesystem
//     const fileContent = fs.readFileSync(photo.filepath);

//     // Set up Azure Blob Storage client
//     const blobServiceClient = BlobServiceClient.fromConnectionString(
//       process.env.AZURE_STORAGE_CONNECTION_STRING
//     );
//     const containerClient = blobServiceClient.getContainerClient(
//       process.env.AZURE_STORAGE_CONTAINER_NAME
//     );
//     const blobName = `${Date.now()}-${photo.originalFilename}`;
//     const blockBlobClient = containerClient.getBlockBlobClient(blobName);

//     // Upload the file to Azure Blob Storage
//     await blockBlobClient.uploadData(fileContent, {
//       blobHTTPHeaders: { blobContentType: photo.mimetype },
//     });

//     // Get the URL of the uploaded file
//     const photoUrl = blockBlobClient.url;

//     // Create a new animal entry in the database
//     const newAnimal = new Animals({
//       name,
//       species,
//       breed,
//       age,
//       weight,
//       gender,
//       description,
//       medicalHistory,
//       isAdopted,
//       shelter,
//       photos: [{ path: photoUrl, contentType: photo.mimetype }], // Store the Blob URL and content type
//     });

//     await newAnimal.save(); // Save the animal data to MongoDB

//     return NextResponse.json({
//       message: "Animal uploaded successfully",
//       animal: newAnimal,
//     });
//   } catch (error) {
//     console.error("Error uploading animal:", error);
//     return NextResponse.json(
//       { message: "Failed to upload animal" },
//       { status: 500 }
//     );
//   }
// }

// Other versions that are not working:
// Partially working, saving animals, but no photo:
// import { NextResponse } from "next/server";
// import multer from "multer";
// import { connectDB } from "@/config/connectDB";
// import Animals from "@/models/animals";

// // Connect to your database
// connectDB();

// // Multer setup for file upload
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: "./public/uploads", // Ensure this folder exists
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + "-" + file.originalname); // Unique filename
//     },
//   }),
// });

// const uploadMiddleware = upload.single("photo"); // Middleware to handle single file upload

// // Helper function to convert multer to promise (to use async/await)
// function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }
//       return resolve(result);
//     });
//   });
// }

// // POST request handler to upload animals
// export async function POST(req) {
//   try {
//     // Create a new Response object to handle `req` with multer
//     const res = new NextResponse();

//     // Run the multer middleware to handle file upload
//     await runMiddleware(req, res, uploadMiddleware);

//     // Access form data from the request
//     const formData = await req.formData();

//     // Extract animal data fields from formData
//     const name = formData.get("name");
//     const species = formData.get("species");
//     const breed = formData.get("breed");
//     const age = formData.get("age");
//     const weight = formData.get("weight");
//     const gender = formData.get("gender");
//     const description = formData.get("description");
//     const medicalHistory = formData.get("medicalHistory");
//     const isAdopted = formData.get("isAdopted");
//     const shelter = formData.get("shelter");

//     // Extract file path for the photo
//     const photo = req.file ? `/uploads/${req.file.filename}` : null;

//     // Create a new animal entry in the database
//     const newAnimal = new Animals({
//       name,
//       species,
//       breed,
//       age,
//       weight,
//       gender,
//       description,
//       medicalHistory,
//       isAdopted,
//       shelter,
//       photos: photo, // Add the uploaded file path to the photos field
//     });

//     await newAnimal.save(); // Save the animal to MongoDB

//     return NextResponse.json({
//       message: "Animal uploaded successfully",
//       animal: newAnimal,
//     });
//   } catch (error) {
//     console.error("Error uploading animal:", error);
//     return NextResponse.json(
//       { message: "Failed to upload animal" },
//       { status: 500 }
//     );
//   }
// }

// // Disable Next.js bodyParser as multer handles it
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// Other option with next-connect that is not working either:

// import nextConnect from "next-connect";
// import multer from "multer";
// import { connectDB } from "@/config/connectDB";
// import Animals from "@/models/animals";

// // Connect to your database
// connectDB();

// // Multer setup for file upload
// const upload = multer({
//   storage: multer.memoryStorage(), // Use memoryStorage to handle file as buffer
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
// });

// const apiRoute = nextConnect({
//   onError(error, req, res) {
//     console.error(error);
//     res.status(500).json({ error: `Something went wrong! ${error.message}` });
//   },
//   onNoMatch(req, res) {
//     res.status(405).json({ error: `Method ${req.method} Not Allowed` });
//   },
// });

// apiRoute.use(upload.single('photo'));

// apiRoute.post(async (req, res) => {
//   try {
//     console.log("Multer processed file:", req.file);

//     // Check if the file was processed
//     if (!req.file) {
//       console.error("File not processed by Multer");
//       throw new Error("File not processed by Multer");
//     }

//     // Extract animal data fields from the request body
//     const { name, species, breed, age, weight, gender, description, medicalHistory, isAdopted, shelter } = req.body;

//     // Extract file data and store as Buffer with contentType
//     const photo = req.file
//       ? { data: req.file.buffer, contentType: req.file.mimetype }
//       : null;

//     // Log the uploaded file for debugging
//     console.log("Uploaded file:", photo);

//     // Create a new animal entry in the database
//     const newAnimal = new Animals({
//       name,
//       species,
//       breed,
//       age,
//       weight,
//       gender,
//       description,
//       medicalHistory,
//       isAdopted,
//       shelter,
//       photos: [photo], // Ensure photos is an array
//     });

//     await newAnimal.save(); // Save the animal to MongoDB

//     res.status(201).json({
//       message: "Animal uploaded successfully",
//       animal: newAnimal,
//     });
//   } catch (error) {
//     console.error("Error uploading animal:", error);
//     res.status(500).json({ message: "Failed to upload animal" });
//   }
// });

// export const config = {
//   api: {
//     bodyParser: false, // Disable Next.js body parsing, so Multer can handle it
//   },
// };

// export default apiRoute;
