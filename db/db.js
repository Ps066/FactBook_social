import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URL}/${DB_NAME}`
    );
    // console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDb Error: ", error);
    process.exit(1);
  }
}

export default connectDB;
