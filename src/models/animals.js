import mongoose from "mongoose";
const Schema = mongoose.Schema;

const animalSchema = new Schema(
  {
    name: { type: String, required: true },
    species: {
      type: String,
      enum: [
        "Dog",
        "Cat",
        "Rabbit",
        "Bird",
        "Racoon",
        "Ferret",
        "Pig",
        "Goat",
        "Duck",
        "Chicken",
        "Turkey",
        "Possum",
        "Guinea Pig",
        "Hamster",
        "Mouse",
        "Rat",
      ],
      required: true, // Make species a required field
    },
    breed: { type: String },
    age: { type: Number },
    weight: { type: Number },
    gender: {
      type: String,
      enum: ["Male", "Female", "Unknown"], // Gender options
      required: true, // Make gender a required field
    },
    description: { type: String },
    medicalHistory: { type: String },
    isAdopted: { type: Boolean, default: false },
    shelter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shelters",
      required: true, // required field to link to shelter
    },
    dateRescued: { type: Date, default: Date.now },
    photo: {
      data: {
        type: Buffer,
        default: null,
      },
      contentType: {
        type: String,
        default: null,
      },
    },
  },
  { collection: "animals" }
);

const Animals =
  mongoose.models.animals || mongoose.model("animals", animalSchema);

export default Animals;
