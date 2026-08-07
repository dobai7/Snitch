import config from "./index.js";
import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(config.MONGO_URI)
  console.log("database is connected");
}

export default connectDB