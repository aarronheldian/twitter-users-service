import { z } from "zod";

export const querySchemaListFollows = z.object({
  page: z
    .string()
    .optional()
    .default("1")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "must be a number" }),
  limit: z
    .string()
    .optional()
    .default("10")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "must be a number" }),
});

export const paramsSchemaListFollows = z.object({
  userId: z.string().min(1, "userId is required"),
});
