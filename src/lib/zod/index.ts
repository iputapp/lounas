import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const RestaurantScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','name','description','website','address','longitude','latitude','travelTime','travelDistance']);

export const RestaurantTagScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','name','description']);

export const RestaurantOpenScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','timeOpen','timeClose','weekTypeId','restaurantId']);

export const WeekTypeScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','name']);

export const RouteScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','description','thumbnailId','nextStepId','previousStepId','routeTypeId','restaurantId']);

export const RouteTypeScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','name']);

export const PaymentScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','accepted','details','paymentTypeId','restaurantId']);

export const PaymentTypeScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','name']);

export const DishScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','name','description','price','eatTime','restaurantId']);

export const DishTagScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','name','description']);

export const DishScoreScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','score','dishId','traitId']);

export const DishTraitScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','name','description','threshold']);

export const VisitHistoryScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','userId','dishId']);

export const UserScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','username','lastLogin','dataUsageAgreed','organizationId']);

export const OrganizationScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','name','emailDomain','isStudent','isStaff']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// RESTAURANT SCHEMA
/////////////////////////////////////////

export const RestaurantSchema = z.object({
  id: z.string().regex(/^[A-Z0-9]+$/).length(8),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string().min(1),
  description: z.string().nullable(),
  website: z.string().url().nullable(),
  address: z.string().nullable(),
  /**
   * zod.number.min(-180).max(180) // disabled validation because of bug: negative value is rejected by zod-schema-types
   */
  longitude: z.number(),
  /**
   * zod.number.min(-90).max(90) // disabled validation because of bug: negative value is rejected by zod-schema-types
   */
  latitude: z.number(),
  travelTime: z.number().nonnegative(),
  travelDistance: z.number().nonnegative(),
})

export type Restaurant = z.infer<typeof RestaurantSchema>

// RESTAURANT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const RestaurantOptionalDefaultsSchema = RestaurantSchema.merge(z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type RestaurantOptionalDefaults = z.infer<typeof RestaurantOptionalDefaultsSchema>

// RESTAURANT RELATION SCHEMA
//------------------------------------------------------

export type RestaurantRelations = {
  restaurantTags: RestaurantTagWithRelations[];
  restaurantOpens: RestaurantOpenWithRelations[];
  routes: RouteWithRelations[];
  payments: PaymentWithRelations[];
  dishes: DishWithRelations[];
};

export type RestaurantWithRelations = z.infer<typeof RestaurantSchema> & RestaurantRelations

export const RestaurantWithRelationsSchema: z.ZodType<RestaurantWithRelations> = RestaurantSchema.merge(z.object({
  restaurantTags: z.lazy(() => RestaurantTagWithRelationsSchema).array(),
  restaurantOpens: z.lazy(() => RestaurantOpenWithRelationsSchema).array(),
  routes: z.lazy(() => RouteWithRelationsSchema).array(),
  payments: z.lazy(() => PaymentWithRelationsSchema).array(),
  dishes: z.lazy(() => DishWithRelationsSchema).array(),
}))

// RESTAURANT OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type RestaurantOptionalDefaultsRelations = {
  restaurantTags: RestaurantTagOptionalDefaultsWithRelations[];
  restaurantOpens: RestaurantOpenOptionalDefaultsWithRelations[];
  routes: RouteOptionalDefaultsWithRelations[];
  payments: PaymentOptionalDefaultsWithRelations[];
  dishes: DishOptionalDefaultsWithRelations[];
};

export type RestaurantOptionalDefaultsWithRelations = z.infer<typeof RestaurantOptionalDefaultsSchema> & RestaurantOptionalDefaultsRelations

export const RestaurantOptionalDefaultsWithRelationsSchema: z.ZodType<RestaurantOptionalDefaultsWithRelations> = RestaurantOptionalDefaultsSchema.merge(z.object({
  restaurantTags: z.lazy(() => RestaurantTagOptionalDefaultsWithRelationsSchema).array(),
  restaurantOpens: z.lazy(() => RestaurantOpenOptionalDefaultsWithRelationsSchema).array(),
  routes: z.lazy(() => RouteOptionalDefaultsWithRelationsSchema).array(),
  payments: z.lazy(() => PaymentOptionalDefaultsWithRelationsSchema).array(),
  dishes: z.lazy(() => DishOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// RESTAURANT TAG SCHEMA
/////////////////////////////////////////

export const RestaurantTagSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string().min(1),
  description: z.string().nullable(),
})

export type RestaurantTag = z.infer<typeof RestaurantTagSchema>

// RESTAURANT TAG OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const RestaurantTagOptionalDefaultsSchema = RestaurantTagSchema.merge(z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type RestaurantTagOptionalDefaults = z.infer<typeof RestaurantTagOptionalDefaultsSchema>

// RESTAURANT TAG RELATION SCHEMA
//------------------------------------------------------

export type RestaurantTagRelations = {
  restaurants: RestaurantWithRelations[];
};

export type RestaurantTagWithRelations = z.infer<typeof RestaurantTagSchema> & RestaurantTagRelations

export const RestaurantTagWithRelationsSchema: z.ZodType<RestaurantTagWithRelations> = RestaurantTagSchema.merge(z.object({
  restaurants: z.lazy(() => RestaurantWithRelationsSchema).array(),
}))

// RESTAURANT TAG OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type RestaurantTagOptionalDefaultsRelations = {
  restaurants: RestaurantOptionalDefaultsWithRelations[];
};

export type RestaurantTagOptionalDefaultsWithRelations = z.infer<typeof RestaurantTagOptionalDefaultsSchema> & RestaurantTagOptionalDefaultsRelations

export const RestaurantTagOptionalDefaultsWithRelationsSchema: z.ZodType<RestaurantTagOptionalDefaultsWithRelations> = RestaurantTagOptionalDefaultsSchema.merge(z.object({
  restaurants: z.lazy(() => RestaurantOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// RESTAURANT OPEN SCHEMA
/////////////////////////////////////////

export const RestaurantOpenSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  timeOpen: z.coerce.date(),
  timeClose: z.coerce.date(),
  weekTypeId: z.number().int(),
  restaurantId: z.string().regex(/^[A-Z0-9]+$/).length(8),
})

export type RestaurantOpen = z.infer<typeof RestaurantOpenSchema>

// RESTAURANT OPEN OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const RestaurantOpenOptionalDefaultsSchema = RestaurantOpenSchema.merge(z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type RestaurantOpenOptionalDefaults = z.infer<typeof RestaurantOpenOptionalDefaultsSchema>

// RESTAURANT OPEN RELATION SCHEMA
//------------------------------------------------------

export type RestaurantOpenRelations = {
  weekType: WeekTypeWithRelations;
  restaurant: RestaurantWithRelations;
};

export type RestaurantOpenWithRelations = z.infer<typeof RestaurantOpenSchema> & RestaurantOpenRelations

export const RestaurantOpenWithRelationsSchema: z.ZodType<RestaurantOpenWithRelations> = RestaurantOpenSchema.merge(z.object({
  weekType: z.lazy(() => WeekTypeWithRelationsSchema),
  restaurant: z.lazy(() => RestaurantWithRelationsSchema),
}))

// RESTAURANT OPEN OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type RestaurantOpenOptionalDefaultsRelations = {
  weekType: WeekTypeOptionalDefaultsWithRelations;
  restaurant: RestaurantOptionalDefaultsWithRelations;
};

export type RestaurantOpenOptionalDefaultsWithRelations = z.infer<typeof RestaurantOpenOptionalDefaultsSchema> & RestaurantOpenOptionalDefaultsRelations

export const RestaurantOpenOptionalDefaultsWithRelationsSchema: z.ZodType<RestaurantOpenOptionalDefaultsWithRelations> = RestaurantOpenOptionalDefaultsSchema.merge(z.object({
  weekType: z.lazy(() => WeekTypeOptionalDefaultsWithRelationsSchema),
  restaurant: z.lazy(() => RestaurantOptionalDefaultsWithRelationsSchema),
}))

/////////////////////////////////////////
// WEEK TYPE SCHEMA
/////////////////////////////////////////

export const WeekTypeSchema = z.object({
  id: z.number().min(0).max(6),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string().min(1),
})

export type WeekType = z.infer<typeof WeekTypeSchema>

// WEEK TYPE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const WeekTypeOptionalDefaultsSchema = WeekTypeSchema.merge(z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type WeekTypeOptionalDefaults = z.infer<typeof WeekTypeOptionalDefaultsSchema>

// WEEK TYPE RELATION SCHEMA
//------------------------------------------------------

export type WeekTypeRelations = {
  restaurantOpens: RestaurantOpenWithRelations[];
};

export type WeekTypeWithRelations = z.infer<typeof WeekTypeSchema> & WeekTypeRelations

export const WeekTypeWithRelationsSchema: z.ZodType<WeekTypeWithRelations> = WeekTypeSchema.merge(z.object({
  restaurantOpens: z.lazy(() => RestaurantOpenWithRelationsSchema).array(),
}))

// WEEK TYPE OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type WeekTypeOptionalDefaultsRelations = {
  restaurantOpens: RestaurantOpenOptionalDefaultsWithRelations[];
};

export type WeekTypeOptionalDefaultsWithRelations = z.infer<typeof WeekTypeOptionalDefaultsSchema> & WeekTypeOptionalDefaultsRelations

export const WeekTypeOptionalDefaultsWithRelationsSchema: z.ZodType<WeekTypeOptionalDefaultsWithRelations> = WeekTypeOptionalDefaultsSchema.merge(z.object({
  restaurantOpens: z.lazy(() => RestaurantOpenOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// ROUTE SCHEMA
/////////////////////////////////////////

export const RouteSchema = z.object({
  id: z.string().regex(/^[A-Z0-9]{8}\d{4}[A-Z0-9]{8}$/),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  description: z.string().nullable(),
  thumbnailId: z.string().nullable(),
  nextStepId: z.string().regex(/^[A-Z0-9]{8}\d{4}[A-Z0-9]{8}$/).nullable(),
  previousStepId: z.string().regex(/^[A-Z0-9]{8}\d{4}[A-Z0-9]{8}$/).nullable(),
  routeTypeId: z.string(),
  restaurantId: z.string().regex(/^[A-Z0-9]+$/).length(8),
})

export type Route = z.infer<typeof RouteSchema>

// ROUTE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const RouteOptionalDefaultsSchema = RouteSchema.merge(z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type RouteOptionalDefaults = z.infer<typeof RouteOptionalDefaultsSchema>

// ROUTE RELATION SCHEMA
//------------------------------------------------------

export type RouteRelations = {
  routeType: RouteTypeWithRelations;
  restaurant: RestaurantWithRelations;
};

export type RouteWithRelations = z.infer<typeof RouteSchema> & RouteRelations

export const RouteWithRelationsSchema: z.ZodType<RouteWithRelations> = RouteSchema.merge(z.object({
  routeType: z.lazy(() => RouteTypeWithRelationsSchema),
  restaurant: z.lazy(() => RestaurantWithRelationsSchema),
}))

// ROUTE OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type RouteOptionalDefaultsRelations = {
  routeType: RouteTypeOptionalDefaultsWithRelations;
  restaurant: RestaurantOptionalDefaultsWithRelations;
};

export type RouteOptionalDefaultsWithRelations = z.infer<typeof RouteOptionalDefaultsSchema> & RouteOptionalDefaultsRelations

export const RouteOptionalDefaultsWithRelationsSchema: z.ZodType<RouteOptionalDefaultsWithRelations> = RouteOptionalDefaultsSchema.merge(z.object({
  routeType: z.lazy(() => RouteTypeOptionalDefaultsWithRelationsSchema),
  restaurant: z.lazy(() => RestaurantOptionalDefaultsWithRelationsSchema),
}))

/////////////////////////////////////////
// ROUTE TYPE SCHEMA
/////////////////////////////////////////

export const RouteTypeSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string().min(1),
})

export type RouteType = z.infer<typeof RouteTypeSchema>

// ROUTE TYPE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const RouteTypeOptionalDefaultsSchema = RouteTypeSchema.merge(z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type RouteTypeOptionalDefaults = z.infer<typeof RouteTypeOptionalDefaultsSchema>

// ROUTE TYPE RELATION SCHEMA
//------------------------------------------------------

export type RouteTypeRelations = {
  routes: RouteWithRelations[];
};

export type RouteTypeWithRelations = z.infer<typeof RouteTypeSchema> & RouteTypeRelations

export const RouteTypeWithRelationsSchema: z.ZodType<RouteTypeWithRelations> = RouteTypeSchema.merge(z.object({
  routes: z.lazy(() => RouteWithRelationsSchema).array(),
}))

// ROUTE TYPE OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type RouteTypeOptionalDefaultsRelations = {
  routes: RouteOptionalDefaultsWithRelations[];
};

export type RouteTypeOptionalDefaultsWithRelations = z.infer<typeof RouteTypeOptionalDefaultsSchema> & RouteTypeOptionalDefaultsRelations

export const RouteTypeOptionalDefaultsWithRelationsSchema: z.ZodType<RouteTypeOptionalDefaultsWithRelations> = RouteTypeOptionalDefaultsSchema.merge(z.object({
  routes: z.lazy(() => RouteOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// PAYMENT SCHEMA
/////////////////////////////////////////

export const PaymentSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  accepted: z.boolean(),
  details: z.string().nullable(),
  paymentTypeId: z.string(),
  restaurantId: z.string().regex(/^[A-Z0-9]+$/).length(8),
})

export type Payment = z.infer<typeof PaymentSchema>

// PAYMENT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const PaymentOptionalDefaultsSchema = PaymentSchema.merge(z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type PaymentOptionalDefaults = z.infer<typeof PaymentOptionalDefaultsSchema>

// PAYMENT RELATION SCHEMA
//------------------------------------------------------

export type PaymentRelations = {
  paymentType: PaymentTypeWithRelations;
  restaurant: RestaurantWithRelations;
};

export type PaymentWithRelations = z.infer<typeof PaymentSchema> & PaymentRelations

export const PaymentWithRelationsSchema: z.ZodType<PaymentWithRelations> = PaymentSchema.merge(z.object({
  paymentType: z.lazy(() => PaymentTypeWithRelationsSchema),
  restaurant: z.lazy(() => RestaurantWithRelationsSchema),
}))

// PAYMENT OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type PaymentOptionalDefaultsRelations = {
  paymentType: PaymentTypeOptionalDefaultsWithRelations;
  restaurant: RestaurantOptionalDefaultsWithRelations;
};

export type PaymentOptionalDefaultsWithRelations = z.infer<typeof PaymentOptionalDefaultsSchema> & PaymentOptionalDefaultsRelations

export const PaymentOptionalDefaultsWithRelationsSchema: z.ZodType<PaymentOptionalDefaultsWithRelations> = PaymentOptionalDefaultsSchema.merge(z.object({
  paymentType: z.lazy(() => PaymentTypeOptionalDefaultsWithRelationsSchema),
  restaurant: z.lazy(() => RestaurantOptionalDefaultsWithRelationsSchema),
}))

/////////////////////////////////////////
// PAYMENT TYPE SCHEMA
/////////////////////////////////////////

export const PaymentTypeSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string().min(1),
})

export type PaymentType = z.infer<typeof PaymentTypeSchema>

// PAYMENT TYPE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const PaymentTypeOptionalDefaultsSchema = PaymentTypeSchema.merge(z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type PaymentTypeOptionalDefaults = z.infer<typeof PaymentTypeOptionalDefaultsSchema>

// PAYMENT TYPE RELATION SCHEMA
//------------------------------------------------------

export type PaymentTypeRelations = {
  payments: PaymentWithRelations[];
};

export type PaymentTypeWithRelations = z.infer<typeof PaymentTypeSchema> & PaymentTypeRelations

export const PaymentTypeWithRelationsSchema: z.ZodType<PaymentTypeWithRelations> = PaymentTypeSchema.merge(z.object({
  payments: z.lazy(() => PaymentWithRelationsSchema).array(),
}))

// PAYMENT TYPE OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type PaymentTypeOptionalDefaultsRelations = {
  payments: PaymentOptionalDefaultsWithRelations[];
};

export type PaymentTypeOptionalDefaultsWithRelations = z.infer<typeof PaymentTypeOptionalDefaultsSchema> & PaymentTypeOptionalDefaultsRelations

export const PaymentTypeOptionalDefaultsWithRelationsSchema: z.ZodType<PaymentTypeOptionalDefaultsWithRelations> = PaymentTypeOptionalDefaultsSchema.merge(z.object({
  payments: z.lazy(() => PaymentOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// DISH SCHEMA
/////////////////////////////////////////

export const DishSchema = z.object({
  id: z.string().regex(/^[A-Z0-9]+$/).length(8),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string().min(1),
  description: z.string().nullable(),
  price: z.number().nonnegative(),
  eatTime: z.number().positive(),
  restaurantId: z.string().regex(/^[A-Z0-9]+$/).length(8),
})

export type Dish = z.infer<typeof DishSchema>

// DISH OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const DishOptionalDefaultsSchema = DishSchema.merge(z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type DishOptionalDefaults = z.infer<typeof DishOptionalDefaultsSchema>

// DISH RELATION SCHEMA
//------------------------------------------------------

export type DishRelations = {
  dishTags: DishTagWithRelations[];
  restaurant: RestaurantWithRelations;
  dishScores: DishScoreWithRelations[];
  visitHistories: VisitHistoryWithRelations[];
};

export type DishWithRelations = z.infer<typeof DishSchema> & DishRelations

export const DishWithRelationsSchema: z.ZodType<DishWithRelations> = DishSchema.merge(z.object({
  dishTags: z.lazy(() => DishTagWithRelationsSchema).array(),
  restaurant: z.lazy(() => RestaurantWithRelationsSchema),
  dishScores: z.lazy(() => DishScoreWithRelationsSchema).array(),
  visitHistories: z.lazy(() => VisitHistoryWithRelationsSchema).array(),
}))

// DISH OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type DishOptionalDefaultsRelations = {
  dishTags: DishTagOptionalDefaultsWithRelations[];
  restaurant: RestaurantOptionalDefaultsWithRelations;
  dishScores: DishScoreOptionalDefaultsWithRelations[];
  visitHistories: VisitHistoryOptionalDefaultsWithRelations[];
};

export type DishOptionalDefaultsWithRelations = z.infer<typeof DishOptionalDefaultsSchema> & DishOptionalDefaultsRelations

export const DishOptionalDefaultsWithRelationsSchema: z.ZodType<DishOptionalDefaultsWithRelations> = DishOptionalDefaultsSchema.merge(z.object({
  dishTags: z.lazy(() => DishTagOptionalDefaultsWithRelationsSchema).array(),
  restaurant: z.lazy(() => RestaurantOptionalDefaultsWithRelationsSchema),
  dishScores: z.lazy(() => DishScoreOptionalDefaultsWithRelationsSchema).array(),
  visitHistories: z.lazy(() => VisitHistoryOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// DISH TAG SCHEMA
/////////////////////////////////////////

export const DishTagSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string().min(1),
  description: z.string().nullable(),
})

export type DishTag = z.infer<typeof DishTagSchema>

// DISH TAG OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const DishTagOptionalDefaultsSchema = DishTagSchema.merge(z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type DishTagOptionalDefaults = z.infer<typeof DishTagOptionalDefaultsSchema>

// DISH TAG RELATION SCHEMA
//------------------------------------------------------

export type DishTagRelations = {
  dishes: DishWithRelations[];
};

export type DishTagWithRelations = z.infer<typeof DishTagSchema> & DishTagRelations

export const DishTagWithRelationsSchema: z.ZodType<DishTagWithRelations> = DishTagSchema.merge(z.object({
  dishes: z.lazy(() => DishWithRelationsSchema).array(),
}))

// DISH TAG OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type DishTagOptionalDefaultsRelations = {
  dishes: DishOptionalDefaultsWithRelations[];
};

export type DishTagOptionalDefaultsWithRelations = z.infer<typeof DishTagOptionalDefaultsSchema> & DishTagOptionalDefaultsRelations

export const DishTagOptionalDefaultsWithRelationsSchema: z.ZodType<DishTagOptionalDefaultsWithRelations> = DishTagOptionalDefaultsSchema.merge(z.object({
  dishes: z.lazy(() => DishOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// DISH SCORE SCHEMA
/////////////////////////////////////////

export const DishScoreSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  score: z.number(),
  dishId: z.string().regex(/^[A-Z0-9]+$/).length(8),
  traitId: z.string(),
})

export type DishScore = z.infer<typeof DishScoreSchema>

// DISH SCORE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const DishScoreOptionalDefaultsSchema = DishScoreSchema.merge(z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type DishScoreOptionalDefaults = z.infer<typeof DishScoreOptionalDefaultsSchema>

// DISH SCORE RELATION SCHEMA
//------------------------------------------------------

export type DishScoreRelations = {
  dish: DishWithRelations;
  trait: DishTraitWithRelations;
};

export type DishScoreWithRelations = z.infer<typeof DishScoreSchema> & DishScoreRelations

export const DishScoreWithRelationsSchema: z.ZodType<DishScoreWithRelations> = DishScoreSchema.merge(z.object({
  dish: z.lazy(() => DishWithRelationsSchema),
  trait: z.lazy(() => DishTraitWithRelationsSchema),
}))

// DISH SCORE OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type DishScoreOptionalDefaultsRelations = {
  dish: DishOptionalDefaultsWithRelations;
  trait: DishTraitOptionalDefaultsWithRelations;
};

export type DishScoreOptionalDefaultsWithRelations = z.infer<typeof DishScoreOptionalDefaultsSchema> & DishScoreOptionalDefaultsRelations

export const DishScoreOptionalDefaultsWithRelationsSchema: z.ZodType<DishScoreOptionalDefaultsWithRelations> = DishScoreOptionalDefaultsSchema.merge(z.object({
  dish: z.lazy(() => DishOptionalDefaultsWithRelationsSchema),
  trait: z.lazy(() => DishTraitOptionalDefaultsWithRelationsSchema),
}))

/////////////////////////////////////////
// DISH TRAIT SCHEMA
/////////////////////////////////////////

export const DishTraitSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string().min(1),
  description: z.string().nullable(),
  threshold: z.number(),
})

export type DishTrait = z.infer<typeof DishTraitSchema>

// DISH TRAIT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const DishTraitOptionalDefaultsSchema = DishTraitSchema.merge(z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type DishTraitOptionalDefaults = z.infer<typeof DishTraitOptionalDefaultsSchema>

// DISH TRAIT RELATION SCHEMA
//------------------------------------------------------

export type DishTraitRelations = {
  dishScores: DishScoreWithRelations[];
};

export type DishTraitWithRelations = z.infer<typeof DishTraitSchema> & DishTraitRelations

export const DishTraitWithRelationsSchema: z.ZodType<DishTraitWithRelations> = DishTraitSchema.merge(z.object({
  dishScores: z.lazy(() => DishScoreWithRelationsSchema).array(),
}))

// DISH TRAIT OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type DishTraitOptionalDefaultsRelations = {
  dishScores: DishScoreOptionalDefaultsWithRelations[];
};

export type DishTraitOptionalDefaultsWithRelations = z.infer<typeof DishTraitOptionalDefaultsSchema> & DishTraitOptionalDefaultsRelations

export const DishTraitOptionalDefaultsWithRelationsSchema: z.ZodType<DishTraitOptionalDefaultsWithRelations> = DishTraitOptionalDefaultsSchema.merge(z.object({
  dishScores: z.lazy(() => DishScoreOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// VISIT HISTORY SCHEMA
/////////////////////////////////////////

export const VisitHistorySchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
  dishId: z.string().regex(/^[A-Z0-9]+$/).length(8),
})

export type VisitHistory = z.infer<typeof VisitHistorySchema>

// VISIT HISTORY OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const VisitHistoryOptionalDefaultsSchema = VisitHistorySchema.merge(z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type VisitHistoryOptionalDefaults = z.infer<typeof VisitHistoryOptionalDefaultsSchema>

// VISIT HISTORY RELATION SCHEMA
//------------------------------------------------------

export type VisitHistoryRelations = {
  user: UserWithRelations;
  dish: DishWithRelations;
};

export type VisitHistoryWithRelations = z.infer<typeof VisitHistorySchema> & VisitHistoryRelations

export const VisitHistoryWithRelationsSchema: z.ZodType<VisitHistoryWithRelations> = VisitHistorySchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  dish: z.lazy(() => DishWithRelationsSchema),
}))

// VISIT HISTORY OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type VisitHistoryOptionalDefaultsRelations = {
  user: UserOptionalDefaultsWithRelations;
  dish: DishOptionalDefaultsWithRelations;
};

export type VisitHistoryOptionalDefaultsWithRelations = z.infer<typeof VisitHistoryOptionalDefaultsSchema> & VisitHistoryOptionalDefaultsRelations

export const VisitHistoryOptionalDefaultsWithRelationsSchema: z.ZodType<VisitHistoryOptionalDefaultsWithRelations> = VisitHistoryOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserOptionalDefaultsWithRelationsSchema),
  dish: z.lazy(() => DishOptionalDefaultsWithRelationsSchema),
}))

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  username: z.string(),
  lastLogin: z.coerce.date().nullable(),
  dataUsageAgreed: z.boolean(),
  organizationId: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

// USER OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const UserOptionalDefaultsSchema = UserSchema.merge(z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  visitHistories: VisitHistoryWithRelations[];
  Organization?: OrganizationWithRelations | null;
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  visitHistories: z.lazy(() => VisitHistoryWithRelationsSchema).array(),
  Organization: z.lazy(() => OrganizationWithRelationsSchema).nullable(),
}))

// USER OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type UserOptionalDefaultsRelations = {
  visitHistories: VisitHistoryOptionalDefaultsWithRelations[];
  Organization?: OrganizationOptionalDefaultsWithRelations | null;
};

export type UserOptionalDefaultsWithRelations = z.infer<typeof UserOptionalDefaultsSchema> & UserOptionalDefaultsRelations

export const UserOptionalDefaultsWithRelationsSchema: z.ZodType<UserOptionalDefaultsWithRelations> = UserOptionalDefaultsSchema.merge(z.object({
  visitHistories: z.lazy(() => VisitHistoryOptionalDefaultsWithRelationsSchema).array(),
  Organization: z.lazy(() => OrganizationOptionalDefaultsWithRelationsSchema).nullable(),
}))

/////////////////////////////////////////
// ORGANIZATION SCHEMA
/////////////////////////////////////////

export const OrganizationSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string(),
  emailDomain: z.string().nullable(),
  isStudent: z.boolean(),
  isStaff: z.boolean(),
})

export type Organization = z.infer<typeof OrganizationSchema>

// ORGANIZATION OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const OrganizationOptionalDefaultsSchema = OrganizationSchema.merge(z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type OrganizationOptionalDefaults = z.infer<typeof OrganizationOptionalDefaultsSchema>

// ORGANIZATION RELATION SCHEMA
//------------------------------------------------------

export type OrganizationRelations = {
  users: UserWithRelations[];
};

export type OrganizationWithRelations = z.infer<typeof OrganizationSchema> & OrganizationRelations

export const OrganizationWithRelationsSchema: z.ZodType<OrganizationWithRelations> = OrganizationSchema.merge(z.object({
  users: z.lazy(() => UserWithRelationsSchema).array(),
}))

// ORGANIZATION OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type OrganizationOptionalDefaultsRelations = {
  users: UserOptionalDefaultsWithRelations[];
};

export type OrganizationOptionalDefaultsWithRelations = z.infer<typeof OrganizationOptionalDefaultsSchema> & OrganizationOptionalDefaultsRelations

export const OrganizationOptionalDefaultsWithRelationsSchema: z.ZodType<OrganizationOptionalDefaultsWithRelations> = OrganizationOptionalDefaultsSchema.merge(z.object({
  users: z.lazy(() => UserOptionalDefaultsWithRelationsSchema).array(),
}))
