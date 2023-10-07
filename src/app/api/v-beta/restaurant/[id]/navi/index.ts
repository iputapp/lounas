import { z } from "zod";

import { RouteSchema, RouteTypeSchema } from "@/lib/zod";

export const naviResponseSchema = RouteSchema.merge(
  z.object({
    routeType: RouteTypeSchema,
  })
).array();

export type NaviResponse = z.infer<typeof naviResponseSchema>;
