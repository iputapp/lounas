import { z } from "zod";

import {
  DishSchema,
  PaymentTypeWithRelationsSchema,
  RestaurantOpenSchema,
  RestaurantSchema,
} from "@/lib/zod";

export const recommendRequestSchema = z.object({
  amount: z.union([z.literal("small"), z.literal("medium"), z.literal("large"), z.literal("any")]),
  priceMax: z.union([z.literal(700), z.literal(1000), z.literal(1300), z.literal(0)]),
  commonality: z.union([z.literal("common"), z.literal("unique"), z.literal("any")]),
  clientDate: z.date(),
});

export type RecommendRequest = z.infer<typeof recommendRequestSchema>;

export const recommendResponseSchema = DishSchema.merge(
  z.object({
    restaurant: RestaurantSchema.merge(
      z.object({
        restaurantOpens: RestaurantOpenSchema.array(),
        payments: PaymentTypeWithRelationsSchema.array(),
      })
    ),
  })
).array();

export type RecommendResponse = z.infer<typeof recommendResponseSchema>;
