// // import { model, Schema } from "mongoose";

import mongoose, { Schema } from "mongoose";
import type { IAppCategory } from "../interface/IAppCategory";

const AppCategorySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
});
export default mongoose.model<IAppCategory>("AppCategory", AppCategorySchema);
