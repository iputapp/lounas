import { z } from "zod";

export const visitRegisterRequestSchema = z.object({
  userId: z.string().uuid(),
  dishId: z.string(),
  date: z.date(),
});

export type VisitRegisterRequest = z.infer<typeof visitRegisterRequestSchema>;
