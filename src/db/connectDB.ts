/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import config from "../config";

const connectDB = async () => {
  try {
    const connectionState = mongoose.connection.readyState;
    if (connectionState === 1) {
      console.log("Database Already CONNECTED");
      return;
    }
    if (connectionState === 2) {
      console.log("Connecting to the DATABASE...");
      return;
    }
    const connectionInstance = await mongoose.connect(config.db_url as string, {
      dbName: "pay-guard",
    });
    console.log(
      `\n MongoDB Connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error: any) {
    console.log("MongoDB Connection FAILED!", error.message);
    process.exit(1);
  }
};
export default connectDB;
