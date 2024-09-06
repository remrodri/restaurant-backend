import { env } from "@/common/utils/envConfig";
import mongoose from "mongoose";

const dbUrl = env.DB_CONNECTION;
const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(`Error la conectar a la BD: ${error}`);
  }
};
// exportamos la funcion para usarla en otros archivos
export default connectDB;
