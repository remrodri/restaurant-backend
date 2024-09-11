import type { ServiceResponse } from "@/common/models/serviceResponse";
import type { IAppCategory } from "../interface/IAppCategory";

export interface IAppCategoryService {
  getAppCategoryById(id: string): Promise<ServiceResponse<IAppCategory | null>>;
  getAllAppCategories(): Promise<ServiceResponse<IAppCategory[] | null>>;
  createAppCategory(appCategory: IAppCategory): Promise<ServiceResponse<IAppCategory | null>>;
  updateAppCategory(id: string, appCategory: IAppCategory): Promise<ServiceResponse<IAppCategory | null>>;
  deleteAppCategory(id: string): Promise<ServiceResponse<IAppCategory | null>>;
}
