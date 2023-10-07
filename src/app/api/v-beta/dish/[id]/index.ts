import { z } from "zod";

import {
  DishSchema,
  PaymentTypeWithRelationsSchema,
  RestaurantOpenSchema,
  RestaurantSchema,
} from "@/lib/zod";

export const dishResponseSchema = DishSchema.merge(
  z.object({
    restaurant: RestaurantSchema.merge(
      z.object({
        restaurantOpens: RestaurantOpenSchema.array(),
        payments: PaymentTypeWithRelationsSchema.array(),
      })
    ),
  })
);

export type DishResponse = z.infer<typeof dishResponseSchema>;
