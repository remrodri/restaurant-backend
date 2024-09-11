import { commonValidations } from "@/common/utils/commonValidation";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type AppCategory = z.infer<typeof AppCategorySchema>;

export const AppCategorySchema = z.object({
  name: z.string(),
});

// Input Validation for 'GET users/:id' endpoint
export const GetAppCategorySchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

export const CreateAppCategorySchema = z.object({
  // body: z.object({name:commonValidations.name})
  // name: z.string().min(1,"name is required")
  body: z.object({ name: z.string() }),
  // name:commonValidations.name
});

export const deleteAppCategory = z.object({
  params: z.object({ id: commonValidations.id }),
});
