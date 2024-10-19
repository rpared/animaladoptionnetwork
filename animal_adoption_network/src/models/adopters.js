import mongoose from "mongoose";
const Schema = mongoose.Schema;

const adopterSchema = new Schema({
  userType: {
    type: String,
    default: "adopter", // This will automatically set the type for adopters
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  province: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  adoptionHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "animal",
    },
  ], // to track past adoptions if any

  householdSize: {
    type: Number, // number of people in the household
  },
  hasOtherPets: {
    type: Boolean, // if they currently have other pets
    default: false,
  },
  otherPetDetails: {
    type: String, // additional info about their other pets
  },
  adoptionStatus: {
    type: String,
    enum: ["pending", "approved", "rejected", "no"],
    default: "no", // track the status of adoption applications
  },
});

const Adopters =
  mongoose.models.adopters || mongoose.model("adopters", adopterSchema);

export default Adopters;
