import { ServiceResponse } from "@/common/models/serviceResponse";
import { AppCategorySchema } from "@/core/app-type/models/AppCategorySchema";
import type { IAppCategoryRepository } from "@/core/app-type/repository/IAppCategoryRepository";
import { logger } from "@/server";
import { StatusCodes } from "http-status-codes";
import type { IAppCategory } from "../interface/IAppCategory";
import type { IAppCategoryService } from "./IAppCategoryService";

class AppCategoryService implements IAppCategoryService {
  private repository: IAppCategoryRepository;

  // Inject the repository into the service via constructor
  constructor(repository: IAppCategoryRepository) {
    this.repository = repository;
  }

  public async updateAppCategory(id: string, appCategory: IAppCategory): Promise<ServiceResponse<IAppCategory | null>> {
    try {
      const updatedAppCategory = await this.repository.updateAsync(id, appCategory);

      if (!updatedAppCategory) {
        const errorMessage = `Error updating AppCategory with id: ${id}.`;
        logger.error(errorMessage);
        return ServiceResponse.failure("An error occurred while updating AppCategory.", null, StatusCodes.NOT_FOUND);
      }

      return ServiceResponse.success("AppCategory updated", updatedAppCategory);
    } catch (ex) {
      const errorMessage = `Error updating AppCategory with id: ${id}: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while updating AppCategory.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  deleteAppCategory(id: string): Promise<IAppCategory | null> {
    throw new Error("Method not implemented.");
  }

  public async getAppCategoryById(id: string): Promise<ServiceResponse<IAppCategory | null>> {
    try {
      const appCategory = await this.repository.findByIdAsync(id);
      if (!appCategory) {
        return ServiceResponse.failure("No appCategory found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<IAppCategory>("AppCategory found", appCategory);
    } catch (ex) {
      const errorMessage = `Error finding AppCategory with id: ${id}: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error ocurred while finding AppCategory.", null, StatusCodes.NOT_FOUND);
    }
  }
  public async getAllAppCategories(): Promise<ServiceResponse<IAppCategory[] | null>> {
    try {
      const appCategories = await this.repository.findAllAsync();
      if (!appCategories || appCategories.length === 0) {
        return ServiceResponse.failure("No AppCategories found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<IAppCategory[]>("AppCategories found", appCategories);
    } catch (ex) {
      const errorMessage = `Error finding all appCategories: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving users.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
  public async createAppCategory(appCategory: IAppCategory): Promise<ServiceResponse<IAppCategory | null>> {
    try {
      const validatedData = AppCategorySchema.parse(appCategory);
      const newAppCategory = await this.repository.createAsync(validatedData);
      logger.info(newAppCategory);
      return ServiceResponse.success<IAppCategory>("AppCategory created successfully", newAppCategory);
    } catch (ex) {
      const errorMessage = `Error creating AppCategory: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while creating AppCategory.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
export default AppCategoryService;
