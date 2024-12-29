import mongoose from "mongoose";
const Schema = mongoose.Schema;

const adoptionRequestSchema = new Schema({
  adopter: {
    type: Schema.Types.ObjectId,
    ref: "adopters",
    required: true,
  },
  animal: {
    type: Schema.Types.ObjectId,
    ref: "animals",
    required: true,
  },
  requestDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
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
  },
  phone: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  householdSize: {
    type: Number,
    required: true,
  },
  hasOtherPets: {
    type: Boolean,
    required: true,
  },
  salaryRange: {
    type: String,
    required: true,
  },
  personalReference: {
    type: String,
    required: true,
  },
  personalReferencePhone: {
    type: String,
    required: true,
  },
  animalName: {
    type: String,
    default: "",
  },
  replyMessage: {
    type: String,
    default: "",
  },
  shelterId: {
    type: Schema.Types.ObjectId,
    ref: "shelters",

  },
  shelterName: {
    type: String,
    default: "",
  },
  shelterEmail: {
    type: String,
    default: "",
  },
  shelterAddress: {
    type: String,
    default: "",
  },
  shelterLatitude: {
    type: Number,
    default: "",
  },
  shelterLongitude: {
    type: Number,
    default: "",
  },
  isArchived: { type: Boolean, default: false }, // New field for archiving
});


const AdoptionRequest =
  mongoose.models.AdoptionRequest ||
  mongoose.model("AdoptionRequest", adoptionRequestSchema);

export default AdoptionRequest;
