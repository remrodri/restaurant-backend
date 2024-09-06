import type { IAppCategory } from "../interface/IAppCategory";

export interface IAppCategoryRepository {
  findByIdAsync(id: string): Promise<IAppCategory | null>;
  findAllAsync(): Promise<IAppCategory[]>;
  createAsync(appCategory: IAppCategory): Promise<IAppCategory | null>;
  updateAsync(id: string, appCategory: IAppCategory): Promise<IAppCategory | null>;
  deleteAsync(id: string): Promise<IAppCategory | null>;
}
