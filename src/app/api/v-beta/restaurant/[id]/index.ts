import { z } from "zod";

import { RestaurantSchema } from "@/lib/zod";

export const restaurantSchema = RestaurantSchema;

export type Restaurant = z.infer<typeof restaurantSchema>;
