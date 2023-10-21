import { z } from "zod";

import {
  DishSchema,
  PaymentSchema,
  PaymentTypeSchema,
  RestaurantOpenSchema,
  RestaurantSchema,
} from "@/lib/zod";

export const recommendRequestSchema = z.object({
  amount: z.union([z.literal("small"), z.literal("medium"), z.literal("large"), z.literal("any")]),
  price: z.union([z.literal(650), z.literal(850), z.literal(1000), z.literal(999999)]),
  commonality: z.union([z.literal("common"), z.literal("unique"), z.literal("any")]),
});

export type RecommendRequest = z.infer<typeof recommendRequestSchema>;

export const recommendResponseSchema = DishSchema.merge(
  z.object({
    restaurant: RestaurantSchema.merge(
      z.object({
        payments: PaymentSchema.merge(
          z.object({
            paymentType: PaymentTypeSchema,
          })
        ).array(),
        restaurantOpens: RestaurantOpenSchema.array(),
      })
    ),
  })
);

export type RecommendResponse = z.infer<typeof recommendResponseSchema>;
