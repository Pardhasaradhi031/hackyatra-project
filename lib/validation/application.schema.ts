import { z } from "zod";

export const applicationSchema = z.object({
  applicationType: z.enum(["Birth", "Death"]),

  applicantName: z
    .string()
    .trim()
    .min(2)
    .max(100),

  applicantEmail: z
    .email()
    .trim()
    .toLowerCase(),

  applicantPhone: z
    .string()
    .trim()
    .min(10)
    .max(15),
});