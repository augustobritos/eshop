import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string({
      required_error: "The name is required.",
      invalid_type_error: "The name must be a string.",
    })
    .min(1, { message: "The name must contain at least 1 character." })
    .max(255, { message: "The name must contain at most 255 characters." }),
  email: z
    .string({
      required_error: "The email is required.",
      invalid_type_error: "The email must be a string.",
    })
    .email({ message: "The email must have a valid format" }),
  password: z
    .string({
      required_error: "The password is required.",
      invalid_type_error: "The password must be a string.",
    })
    .min(6, { message: "The password must contain at least 6 characters." })
    .max(255, {
      message: "The password must contain at most 255 characters.",
    }),
});

export const signInSchema = z.object({
  email: z
    .string({
      required_error: "The email is required.",
      invalid_type_error: "The email must be a string.",
    })
    .email({ message: "The email must have a valid format" }),
  password: z
    .string({
      required_error: "The password is required.",
      invalid_type_error: "The password must be a string.",
    })
    .min(6, { message: "The password must contain at least 6 characters." })
    .max(255, {
      message: "The password must contain at most 255 characters.",
    }),
});
