import mongoose from "mongoose";

const AnimalPicsSchema = new mongoose.Schema({
  photos: [
    {
      data: Buffer,
      contentType: String,
    },
  ],
});

// Use existing model if already defined, otherwise define it
const AnimalPics =
  mongoose.models.AnimalPics || mongoose.model("AnimalPics", AnimalPicsSchema);

export default AnimalPics;
