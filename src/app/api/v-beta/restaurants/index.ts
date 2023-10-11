import { z } from "zod";

import { RestaurantSchema } from "@/lib/zod";

export const restaurantsSchema = RestaurantSchema.array();

export type Restaurants = z.infer<typeof restaurantsSchema>;
