import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://victorotbabs:aSVwaslfD15dp0Ex@authappcluster0.fiy8e.mongodb.net/?retryWrites=true&w=majority&appName=AuthAppCluster0"
    );
  } catch (error) {
    console.log("MongoDB connection faile: ", error);
  }
};