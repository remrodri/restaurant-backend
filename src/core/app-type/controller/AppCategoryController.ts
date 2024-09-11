import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { Request, RequestHandler, Response } from "express";
import { deleteAppCategory } from "../models/AppCategorySchema";
import { appCategoryService } from "../services/appCategoryService";

class AppCategoryController {
  public getAppCategories: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await appCategoryService.getAllAppCategories();
    return handleServiceResponse(serviceResponse, res);
  };

  public getAppCategory: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;
    const serviceResponse = await appCategoryService.getAppCategoryById(id);
    return handleServiceResponse(serviceResponse, res);
  };

  public createAppCategory: RequestHandler = async (req: Request, res: Response) => {
    const appCategory = req.body;
    const serviceResponse = await appCategoryService.createAppCategory(appCategory);
    return handleServiceResponse(serviceResponse, res);
  };

  public deleteAppCategory: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;
    const serviceResponse = await appCategoryService.deleteAppCategory(id);
    return handleServiceResponse(serviceResponse, res);
  };
}
export const appCategoryController = new AppCategoryController();
