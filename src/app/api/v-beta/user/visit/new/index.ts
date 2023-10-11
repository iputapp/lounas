import { z } from "zod";

export const visitRegisterRequestSchema = z.object({
  dishId: z
    .string()
    .regex(/^[A-Z0-9]+$/)
    .length(8),
  date: z.date().optional(),
});

export type VisitRegisterRequest = z.infer<typeof visitRegisterRequestSchema>;
