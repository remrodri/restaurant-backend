import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import AppCategoryController from "@/core/app-type/controller/AppCategoryController";
import type { IAppCategoryRepository } from "@/core/app-type/repository/IAppCategoryRepository";
import AppCategoryRepository from "@/core/app-type/repository/appCategoryRepository";
import AppCategoryService from "@/core/app-type/services/appCategoryService";
import { AppCategorySchema, GetAppCategorySchema } from "./models/AppCategorySchema";

export const appCategoryRegistry = new OpenAPIRegistry();
export const appCategoryRouter: Router = express.Router();

const route = "/app-categories";

// Create the repository and service instances
const appCategoryRepository: IAppCategoryRepository = new AppCategoryRepository();
const appCategoryService = new AppCategoryService(appCategoryRepository);

// Inject the service into the controller
const appCategoryController = new AppCategoryController(appCategoryService);

appCategoryRegistry.register("AppCategory", AppCategorySchema);

appCategoryRegistry.registerPath({
  method: "get",
  path: "/api/v1/app-categories",
  tags: ["AppCategory"],
  responses: createApiResponse(z.array(AppCategorySchema), "Success"),
});

appCategoryRouter.get(`${route}/`, appCategoryController.getAppCategories);

appCategoryRegistry.registerPath({
  method: "get",
  path: "/api/v1/app-categories/{id}",
  tags: ["AppCategory"],
  request: { params: GetAppCategorySchema.shape.params },
  responses: createApiResponse(AppCategorySchema, "Success"),
});

appCategoryRouter.get(`${route}/:id`, appCategoryController.getAppCategory);

appCategoryRegistry.registerPath({
  method: "post",
  path: "/api/v1/app-categories",
  tags: ["AppCategory"],
  responses: createApiResponse(AppCategorySchema, "AppCategory created successfully"),
});

// appCategoryRouter.post("/", validateRequest(CreateAppCategorySchema), appCategoryController.createAppCategory)
appCategoryRouter.post(`${route}/`, appCategoryController.createAppCategory);

appCategoryRouter.put(`${route}/:id`, appCategoryController.updateAppCategory);
