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
});

const AdoptionRequest =
  mongoose.models.AdoptionRequest ||
  mongoose.model("AdoptionRequest", adoptionRequestSchema);

export default AdoptionRequest;
