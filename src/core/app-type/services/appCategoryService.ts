import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { StatusCodes } from "http-status-codes";
import type { IAppCategory } from "../interface/IAppCategory";
import { type AppCategory, AppCategorySchema } from "../models/AppCategorySchema";
import { AppCategoryRepository, appCategoryRepository } from "../repository/appCategoryRepository";
import type { IAppCategoryService } from "./IAppCategoryService";

export class AppCategoryService implements IAppCategoryService {
  updateAppCategory(id: string, appCategory: IAppCategory): Promise<IAppCategory | null> {
    throw new Error("Method not implemented.");
  }

  public async getAppCategoryById(id: string): Promise<ServiceResponse<AppCategory | null>> {
    try {
      const appCategory = await appCategoryRepository.findByIdAsync(id);
      if (!appCategory) {
        return ServiceResponse.failure("No appCategory found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<AppCategory>("AppCategory found", appCategory);
    } catch (ex) {
      const errorMessage = `Error finding AppCategory with id: ${id}: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error ocurred while finding AppCategory.", null, StatusCodes.NOT_FOUND);
    }
  }
  public async getAllAppCategories(): Promise<ServiceResponse<AppCategory[] | null>> {
    try {
      const appCategories = await appCategoryRepository.findAllAsync();
      if (!appCategories || appCategories.length === 0) {
        return ServiceResponse.failure("No AppCategories found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<AppCategory[]>("AppCategories found", appCategories);
    } catch (ex) {
      const errorMessage = `Error finding all appCategories: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error ocurred while retrieving users.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
  public async createAppCategory(appCategory: IAppCategory): Promise<ServiceResponse<IAppCategory | null>> {
    try {
      const validatedData = AppCategorySchema.parse(appCategory);
      const newAppCategory = await appCategoryRepository.createAsync(validatedData);
      logger.info(newAppCategory);
      return ServiceResponse.success<IAppCategory>("AppCategory created succesfully", newAppCategory);
    } catch (ex) {
      const errorMessage = `Error creating AppCategory: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error ocurred while creating AppCategory.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async deleteAppCategory(id: string): Promise<ServiceResponse<IAppCategory | null>> {
    try {
      const deletedAppCategory = await appCategoryRepository.deleteAsync(id);
      if (!deletedAppCategory) {
        return ServiceResponse.failure(`AppCategory with id ${id} not found`, null, StatusCodes.NOT_FOUND);
      }
      logger.info(`AppCategory with id ${id} deleted succesfully`);
      return ServiceResponse.success("AppCategory deleted succesfully", deletedAppCategory);
    } catch (ex) {
      const errorMessage = `Error deleting appCategory ${id}: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("Error while deleting AppCategory", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
export const appCategoryService = new AppCategoryService();
