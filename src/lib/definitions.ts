import { z } from "zod";

export const SigninFormSchema = z.object({
  username: z.string().trim(),
  password: z.string().trim(),
});

export type FormState =
  | {
      errors?: {
        username?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
