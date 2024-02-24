import * as z from "zod";

export const SignUpValidation = z.object({
  name: z.string().min(2, { message: "Enter your Real Name" }),
  username: z.string().min(2, { message: "Too Short" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Too Short" })
    .max(12, { message: "Password must be under 8 to 12 characters" }),
});

export const SignInValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Too Short" })
    .max(12, { message: "Password must be under 8 to 12 characters" }),
});

export const PostValidation = z.object({
  caption: z.string().min(5).max(1111),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tag: z.string(),
});

export const EditPostValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Enter your Valid Name" }),
  username: z.string().min(2, { message: "Too Short" }),
  email: z.string().email(),
  bio: z.string().min(10, { message: "Add Meaningfull Bio" }).max(1111),
});
