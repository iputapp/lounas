import { z } from "zod";

import { PaymentType } from "@/components/lists/PaymentShort";
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

/** Temporary workaround until Prisma supports JST */
/**
 * @todo Remove this when Prisma supports JST
 */
type RecommendQuery = {
  id: string;
  name: string;
  description: string;
  price: number;
  eat_time: number;
  restaurant_id: string;
  restaurant_name: string;
  restaurant_description: string;
  website: string;
  address: string;
  longitude: number;
  latitude: number;
  travel_time: number;
  travel_distance: number;
  time_open: string;
  time_close: string;
  payment_name: string;
  payment_accepted: boolean;
  payment_details: string;
};

/**
 * @todo Remove this when Prisma supports JST
 */
type RecommendFixed = {
  basic: Omit<RecommendQuery, "payment_name" | "payment_accepted" | "payment_details">;
  payments: {
    type: PaymentType;
    accepted: boolean;
  }[];
};

/**
 * @todo Remove this when Prisma supports JST
 */
type RecommendResponseF = {
  dish: {
    id: string;
    name: string;
    price: number;
    eatTime: number;
  };
  restaurant: {
    id: string;
    name: string;
    travelTime: number;
    travelDistance: number;
    time_open: string;
    time_close: string;
    payments: Pick<RecommendFixed, "payments">["payments"];
  };
};

export type { PaymentType, RecommendFixed, RecommendQuery, RecommendResponseF };
