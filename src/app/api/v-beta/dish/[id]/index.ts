import { z } from "zod";

import {
  DishSchema,
  PaymentSchema,
  PaymentTypeSchema,
  RestaurantOpenSchema,
  RestaurantSchema,
  WeekTypeSchema,
} from "@/lib/zod";

export const dishSchema = DishSchema.merge(
  z.object({
    restaurant: RestaurantSchema.merge(
      z.object({
        restaurantOpens: RestaurantOpenSchema.merge(
          z.object({
            weekType: WeekTypeSchema,
          })
        ).array(),
        payments: PaymentSchema.merge(
          z.object({
            paymentType: PaymentTypeSchema,
          })
        ).array(),
      })
    ),
  })
);

export type Dish = z.infer<typeof dishSchema>;
