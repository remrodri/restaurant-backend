import { z } from "zod";

export const commonValidations = {
  id: z.string().min(1, "Name is required"),
  // .refine((data) => !Number.isNaN(Number(data)), "ID must be a numeric value")
  // .transform(Number)
  // .refine((num) => num > 0, "ID must be a positive number"),
  // ... other common validations
  name: z.string().min(1, "Name is required").max(255, "Name must be at most 255 characters"),
};
