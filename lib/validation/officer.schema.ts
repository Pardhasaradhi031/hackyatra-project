import { z } from "zod";

export const createOfficerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  ward_id: z.string().min(1),
});