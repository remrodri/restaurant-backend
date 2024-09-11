import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { appCategoryController } from "./controller/AppCategoryController";
import { AppCategorySchema, GetAppCategorySchema } from "./models/AppCategorySchema";

export const appCategoryRegistry = new OpenAPIRegistry();
export const appCategoryRouter: Router = express.Router();

const route = "/app-categories";

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

appCategoryRegistry.registerPath({
  method: "delete",
  path: "/api/v1/app-categories/{id}",
  tags: ["AppCategory"],
  request: { params: GetAppCategorySchema.shape.params },
  // responses: createApiResponse(z.object({ message: z.string() }), "AppCategory deleted successfully", 204),
  responses: createApiResponse(AppCategorySchema, "AppCategory deleted successfully", 204),
});

appCategoryRouter.delete(`${route}/:id`, appCategoryController.deleteAppCategory);
