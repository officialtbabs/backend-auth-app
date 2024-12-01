import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://victorotbabs:aSVwaslfD15dp0Ex@authappcluster0.fiy8e.mongodb.net/?retryWrites=true&w=majority&appName=AuthAppCluster0"
    );
  } catch (error: any) {
    throw new Error(error);
    // console.log("MongoDB connection failed: ", error);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
  } catch (error: any) {
    throw new Error(error);
    // console.log("MongoDB disconnection failed: ", error);
  }
};
