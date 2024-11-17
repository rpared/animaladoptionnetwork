import mongoose from "mongoose";
const Schema = mongoose.Schema;

const shelterSchema = new Schema({
  userType: {
    type: String,
    default: "shelter", // This will automatically set the type for shelters
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true, // Index for better performance
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  administratorLastName: {
    type: String,
    required: true,
  },
  administratorFirstName: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  // Charitable Registration Number is required
  charitableRegistrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  // Operating License Number is required
  operatingLicenseNumber: {
    type: String,
    required: true,
  },
  // Optional document uploads
  documentUploads: {
    legalDocument: {
      url: {
        type: String,
      },
      fileType: {
        type: String,
      },
      fileSize: {
        type: Number,
      },
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    },
  },
  latitude: {
  type: Number,
  
  },
  longitude: {
    type: Number,
    
  },
});

const Shelters =
  mongoose.models.Shelters || mongoose.model("Shelters", shelterSchema);

export default Shelters;
