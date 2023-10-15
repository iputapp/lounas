import { z } from "zod";

import { RestaurantSchema, RouteSchema, RouteTypeSchema } from "@/lib/zod";

export const routeSchema = RouteSchema.merge(
  z.object({
    routeType: RouteTypeSchema,
    restaurant: RestaurantSchema,
  })
).array();

export type Route = z.infer<typeof routeSchema>;
