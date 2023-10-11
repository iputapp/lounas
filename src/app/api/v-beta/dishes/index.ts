import { z } from "zod";

import { DishSchema, RestaurantSchema } from "@/lib/zod";

export const dishesSchema = DishSchema.merge(
  z.object({
    restaurant: RestaurantSchema,
  })
).array();

export type Dishes = z.infer<typeof dishesSchema>;
