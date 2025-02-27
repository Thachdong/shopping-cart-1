import { array, number, object, string } from "zod";

export const createCollectionSchema = object({
  name: string()
    .min(1)
    .refine((val) => val.trim() !== "", {
      message: "Name cannot be an empty string",
    }),
  description: string()
    .min(1)
    .refine((val) => val.trim() !== "", {
      message: "Description cannot be an empty string",
    }),
  productIds: array(number()).optional(),
  blogpostIds: array(number()).optional(),
});

export const updateGeneralCollSchema = object({
  name: string()
    .min(1)
    .refine((val) => val.trim() !== "", {
      message: "Name cannot be an empty string",
    }),
  description: string()
    .min(1)
    .refine((val) => val.trim() !== "", {
      message: "Description cannot be an empty string",
    }),
});
