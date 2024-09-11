import { logger } from "@/server";
import type { IAppCategory } from "../interface/IAppCategory";
import AppCategoryModel from "../models/AppCategoryModel";
import type { IAppCategoryRepository } from "./IAppCategoryRepository";

class AppCategoryRepository implements IAppCategoryRepository {
  public async updateAsync(id: string, appCategory: IAppCategory): Promise<IAppCategory | null> {
    // Use findByIdAndUpdate with new: true to return the updated document
    return AppCategoryModel.findByIdAndUpdate(
      id,
      { $set: appCategory }, // Update with the new appCategory data
      { new: true, runValidators: true }, // Options: return the updated document, run schema validators
    );
  }

  public async findByIdAsync(id: string): Promise<IAppCategory | null> {
    const result = await AppCategoryModel.findById(id).exec();
    logger.info(result);
    return result;
  }
  public async findAllAsync(): Promise<IAppCategory[]> {
    // return appCategories;
    const result: IAppCategory[] = await AppCategoryModel.find().exec();
    logger.info(typeof result);
    return result;
  }
  public async createAsync(appCategory: IAppCategory): Promise<IAppCategory> {
    const newAppCategory = new AppCategoryModel(appCategory);
    return await newAppCategory.save();
  }

  public async deleteAsync(id: string): Promise<IAppCategory | null> {
    const result = await AppCategoryModel.findByIdAndDelete(id).exec();
    return result;
  }
}

export default AppCategoryRepository;
