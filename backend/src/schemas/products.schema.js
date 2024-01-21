import { z } from "zod";

export const createProductSchema = z.object({
  title: z
    .string({
      required_error_message: "The title is required.",
      invalid_type_error_message: "The title must be a string.",
    })
    .min(1, { message: "The title must contain at least 1 character." })
    .max(255, { message: "The title must contain at most 255 characters." }),
  description: z
    .string({
      invalid_type_error_message: "The description must be a string.",
    })
    .min(0)
    .max(255, {
      message: "The description must contain at most 255 characters.",
    })
    .optional(),
});

export const updateProductSchema = z.object({
  title: z
    .string({
      required_error_message: "The title is required.",
      invalid_type_error_message: "The title must be a string.",
    })
    .min(1, { message: "The title must contain at least 1 character." })
    .max(255, { message: "The title must contain at most 255 characters." })
    .optional(),
  description: z
    .string({
      invalid_type_error_message: "The description must be a string.",
    })
    .min(0)
    .max(255, {
      message: "The description must contain at most 255 characters.",
    })
    .optional(),
});
