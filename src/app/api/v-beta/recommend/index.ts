import { z } from "zod";

import {
  DishSchema,
  DishScoreSchema,
  DishTraitSchema,
  PaymentSchema,
  PaymentTypeSchema,
  RestaurantOpenSchema,
  RestaurantSchema,
  WeekTypeSchema,
} from "@/lib/zod";

export const recommendRequestSchema = z.object({
  amount: z.union([z.literal("small"), z.literal("medium"), z.literal("large"), z.literal("any")]),
  price: z.union([z.literal(650), z.literal(850), z.literal(1000), z.literal(999999)]),
  commonality: z.union([z.literal("common"), z.literal("unique"), z.literal("any")]),
});

export type RecommendRequest = z.infer<typeof recommendRequestSchema>;

// export const recommendResponseSchema = DishScoreSchema.merge(
//   z.object({
//     restaurant: RestaurantSchema.merge(
//       z.object({
//         restaurantOpens: RestaurantOpenSchema.merge(
//           z.object({
//             weekType: WeekTypeSchema,
//           })
//         ).array(),
//         payments: PaymentSchema.merge(
//           z.object({
//             paymentType: PaymentTypeSchema,
//           })
//       ).array()
//       }),
//     ),
//   })
// ).array();

export const recommendResponseSchema = DishScoreSchema.merge(
  z.object({
    dish: DishSchema.merge(
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
        dishTraits: DishTraitSchema,
      })
    ),
  })
).array();

export type RecommendResponse = z.infer<typeof recommendResponseSchema>;
