import multer from "multer";
import { NextResponse } from "next/server";
import { connectDB } from "@/config/connectDB";
import AnimalPics from "@/models/animalPics";

// Connect to your MongoDB database
connectDB();

// Configure multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5 MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"]; // Add more if needed
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("File type not allowed"), false);
    }
    cb(null, true);
  },
});

// Middleware wrapper function to handle file uploads manually
async function handleFileUpload(req) {
  return new Promise((resolve, reject) => {
    upload.single("photo")(req, {}, (err) => {
      if (err) reject(err);
      else resolve(req.file);
    });
  });
}

export const config = {
  api: {
    bodyParser: false, // Disable body parsing for multer to handle
  },
};

export async function POST(req) {
  try {
    // Use the helper function to process the upload
    const file = await handleFileUpload(req);
    console.log("Uploaded file:", file); // Log the uploaded file for debugging
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const { mimetype, buffer } = file;

    // Save photo data to MongoDB
    const newAnimalPic = new AnimalPics({
      photos: [
        {
          data: buffer,
          contentType: mimetype,
        },
      ],
    });

    await newAnimalPic.save();

    return NextResponse.json(
      { message: "Animal photo saved successfully", animalPic: newAnimalPic },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading photo:", error); // Log any errors
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
