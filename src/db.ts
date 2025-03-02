import mongoose from "mongoose";
import { config } from "./config";
import { connect, logError } from "./common/helpers/logger.helper";

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);

    connect(connectDB.name);
  } catch (error) {
    logError(connectDB.name, error, "Error al conectar con MongoDB");
    process.exit(1);
  }
};

export { connectDB };
