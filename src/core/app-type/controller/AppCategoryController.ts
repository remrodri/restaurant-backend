import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { IAppCategoryService } from "@/core/app-type/services/IAppCategoryService";
import type { Request, RequestHandler, Response } from "express";
import { deleteAppCategory } from "../models/AppCategorySchema";

class AppCategoryController {
  private service: IAppCategoryService;

  // Inject the service into the controller via constructor
  constructor(service: IAppCategoryService) {
    this.service = service;
  }
  public getAppCategories: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await this.service.getAllAppCategories();
    return handleServiceResponse(serviceResponse, res);
  };

  public getAppCategory: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;
    const serviceResponse = await this.service.getAppCategoryById(id);
    return handleServiceResponse(serviceResponse, res);
  };

  public createAppCategory: RequestHandler = async (req: Request, res: Response) => {
    const appCategory = req.body;
    const serviceResponse = await this.service.createAppCategory(appCategory);
    return handleServiceResponse(serviceResponse, res);
  };

  public updateAppCategory: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;
    const appCategory = req.body; // Assuming the update data comes in the request body

    const serviceResponse = await this.service.updateAppCategory(id, appCategory);

    // Handle the response with the utility function
    return handleServiceResponse(serviceResponse, res);
  };

  public deleteAppCategory: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;
    const serviceResponse = await this.service.deleteAppCategory(id);
    return handleServiceResponse(serviceResponse, res);
  };
}
export default AppCategoryController;
