import multer from "multer";
import nextConnect from "next-connect";
import { connectDB } from "@/config/connectDB";
import Animals from "@/models/animals";

// Connect to your database
connectDB();

// Multer setup for file upload
const storage = multer.memoryStorage(); // Use memoryStorage to handle file as buffer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

// Middleware setup
const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("photo")); // Middleware to handle single file upload

// Route handler
apiRoute.post(async (req, res) => {
  try {
    const { file } = req;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { originalname, mimetype, buffer } = file;

    const newAnimal = new Animals({
      // Add other fields as needed
      photo: {
        data: buffer,
        contentType: mimetype,
      },
    });

    await newAnimal.save();

    res
      .status(200)
      .json({ message: "Animal saved successfully", animal: newAnimal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default apiRoute;
