import mongoose from "mongoose";

export const connectDB = async () => {
  try {
<<<<<<< HEAD
    mongoose.connect(process.env.MONGODB_URI!);
=======
    console.log("process.env.MONGODB_URI", process.env.MONGODB_URI!);
    await mongoose.connect(process.env.MONGODB_URI!);
>>>>>>> sara2
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong!");
    console.log(error);
  }
};
