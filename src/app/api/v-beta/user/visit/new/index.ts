import { z } from "zod";

import { VisitHistorySchema } from "@/lib/zod";

export const visitRegisterRequestSchema = VisitHistorySchema.pick({
  dishId: true,
});

export type VisitRegisterRequest = z.infer<typeof visitRegisterRequestSchema>;
