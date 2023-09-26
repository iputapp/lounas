import { z } from 'zod';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const RestaurantScalarFieldEnumSchema = z.enum(['id','urlId','createdAt','updatedAt','name','description','address','website','longtitude','latitude','travelTime']);

export const DishScalarFieldEnumSchema = z.enum(['id','urlId','createdAt','updatedAt','name','description','price','amount','eatTime','restaurantId','thumbnailId']);

export const PaymentMethodScalarFieldEnumSchema = z.enum(['id','name']);

export const PhotoScalarFieldEnumSchema = z.enum(['id','urlId','createdAt','updatedAt','dishId']);

export const VisitHistoryScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','dishId','userId','visitDate']);

export const TraitScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export const DishTraitScoreScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','dishId','traidId','score']);

export const RouteStepScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','restaurantId','nextStepId']);

export const TagRestaurantScalarFieldEnumSchema = z.enum(['id','label']);

export const TagDishScalarFieldEnumSchema = z.enum(['id','label']);

export const UserScalarFieldEnumSchema = z.enum(['id','urlId','isStudent','studentId','createdAt','updatedAt','lastLogin']);

export const AuthMethodScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','name']);

export const AuthMethodUserVerifiedScalarFieldEnumSchema = z.enum(['id','updatedAt','authMethodId','userId','isVerified']);

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
  id: z.string().uuid(),
  /**
   * ///////omit?optional?
   */
  urlId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string().min(1),
  description: z.string().nullable(),
  address: z.string().nullable(),
  website: z.string().nullable(),
  longtitude: z.number().max(180),
  latitude: z.number().max(90),
  travelTime: z.number().nonnegative(),
})

export type Restaurant = z.infer<typeof RestaurantSchema>

// RESTAURANT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const RestaurantOptionalDefaultsSchema = RestaurantSchema.merge(z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type RestaurantOptionalDefaults = z.infer<typeof RestaurantOptionalDefaultsSchema>

// RESTAURANT RELATION SCHEMA
//------------------------------------------------------

export type RestaurantRelations = {
  dishes: DishWithRelations[];
  payments: PaymentMethodWithRelations[];
  tags: TagRestaurantWithRelations[];
  routeSteps: RouteStepWithRelations[];
};

export type RestaurantWithRelations = z.infer<typeof RestaurantSchema> & RestaurantRelations

export const RestaurantWithRelationsSchema: z.ZodType<RestaurantWithRelations> = RestaurantSchema.merge(z.object({
  dishes: z.lazy(() => DishWithRelationsSchema).array(),
  payments: z.lazy(() => PaymentMethodWithRelationsSchema).array(),
  tags: z.lazy(() => TagRestaurantWithRelationsSchema).array(),
  routeSteps: z.lazy(() => RouteStepWithRelationsSchema).array(),
}))

// RESTAURANT OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type RestaurantOptionalDefaultsRelations = {
  dishes: DishOptionalDefaultsWithRelations[];
  payments: PaymentMethodOptionalDefaultsWithRelations[];
  tags: TagRestaurantOptionalDefaultsWithRelations[];
  routeSteps: RouteStepOptionalDefaultsWithRelations[];
};

export type RestaurantOptionalDefaultsWithRelations = z.infer<typeof RestaurantOptionalDefaultsSchema> & RestaurantOptionalDefaultsRelations

export const RestaurantOptionalDefaultsWithRelationsSchema: z.ZodType<RestaurantOptionalDefaultsWithRelations> = RestaurantOptionalDefaultsSchema.merge(z.object({
  dishes: z.lazy(() => DishOptionalDefaultsWithRelationsSchema).array(),
  payments: z.lazy(() => PaymentMethodOptionalDefaultsWithRelationsSchema).array(),
  tags: z.lazy(() => TagRestaurantOptionalDefaultsWithRelationsSchema).array(),
  routeSteps: z.lazy(() => RouteStepOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// DISH SCHEMA
/////////////////////////////////////////

export const DishSchema = z.object({
  id: z.string().uuid(),
  urlId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string().min(1),
  description: z.string().nullable(),
  price: z.number().nonnegative(),
  amount: z.number().positive(),
  eatTime: z.number().positive(),
  restaurantId: z.string(),
  thumbnailId: z.string(),
})

export type Dish = z.infer<typeof DishSchema>

// DISH OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const DishOptionalDefaultsSchema = DishSchema.merge(z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type DishOptionalDefaults = z.infer<typeof DishOptionalDefaultsSchema>

// DISH RELATION SCHEMA
//------------------------------------------------------

export type DishRelations = {
  restaurant: RestaurantWithRelations;
  traits: DishTraitScoreWithRelations[];
  tags: TagDishWithRelations[];
  photos: PhotoWithRelations[];
  visitHistory: VisitHistoryWithRelations[];
};

export type DishWithRelations = z.infer<typeof DishSchema> & DishRelations

export const DishWithRelationsSchema: z.ZodType<DishWithRelations> = DishSchema.merge(z.object({
  restaurant: z.lazy(() => RestaurantWithRelationsSchema),
  traits: z.lazy(() => DishTraitScoreWithRelationsSchema).array(),
  tags: z.lazy(() => TagDishWithRelationsSchema).array(),
  photos: z.lazy(() => PhotoWithRelationsSchema).array(),
  visitHistory: z.lazy(() => VisitHistoryWithRelationsSchema).array(),
}))

// DISH OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type DishOptionalDefaultsRelations = {
  restaurant: RestaurantOptionalDefaultsWithRelations;
  traits: DishTraitScoreOptionalDefaultsWithRelations[];
  tags: TagDishOptionalDefaultsWithRelations[];
  photos: PhotoOptionalDefaultsWithRelations[];
  visitHistory: VisitHistoryOptionalDefaultsWithRelations[];
};

export type DishOptionalDefaultsWithRelations = z.infer<typeof DishOptionalDefaultsSchema> & DishOptionalDefaultsRelations

export const DishOptionalDefaultsWithRelationsSchema: z.ZodType<DishOptionalDefaultsWithRelations> = DishOptionalDefaultsSchema.merge(z.object({
  restaurant: z.lazy(() => RestaurantOptionalDefaultsWithRelationsSchema),
  traits: z.lazy(() => DishTraitScoreOptionalDefaultsWithRelationsSchema).array(),
  tags: z.lazy(() => TagDishOptionalDefaultsWithRelationsSchema).array(),
  photos: z.lazy(() => PhotoOptionalDefaultsWithRelationsSchema).array(),
  visitHistory: z.lazy(() => VisitHistoryOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// PAYMENT METHOD SCHEMA
/////////////////////////////////////////

export const PaymentMethodSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
})

export type PaymentMethod = z.infer<typeof PaymentMethodSchema>

// PAYMENT METHOD OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const PaymentMethodOptionalDefaultsSchema = PaymentMethodSchema.merge(z.object({
  id: z.string().uuid().optional(),
}))

export type PaymentMethodOptionalDefaults = z.infer<typeof PaymentMethodOptionalDefaultsSchema>

// PAYMENT METHOD RELATION SCHEMA
//------------------------------------------------------

export type PaymentMethodRelations = {
  restaurants: RestaurantWithRelations[];
};

export type PaymentMethodWithRelations = z.infer<typeof PaymentMethodSchema> & PaymentMethodRelations

export const PaymentMethodWithRelationsSchema: z.ZodType<PaymentMethodWithRelations> = PaymentMethodSchema.merge(z.object({
  restaurants: z.lazy(() => RestaurantWithRelationsSchema).array(),
}))

// PAYMENT METHOD OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type PaymentMethodOptionalDefaultsRelations = {
  restaurants: RestaurantOptionalDefaultsWithRelations[];
};

export type PaymentMethodOptionalDefaultsWithRelations = z.infer<typeof PaymentMethodOptionalDefaultsSchema> & PaymentMethodOptionalDefaultsRelations

export const PaymentMethodOptionalDefaultsWithRelationsSchema: z.ZodType<PaymentMethodOptionalDefaultsWithRelations> = PaymentMethodOptionalDefaultsSchema.merge(z.object({
  restaurants: z.lazy(() => RestaurantOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// PHOTO SCHEMA
/////////////////////////////////////////

export const PhotoSchema = z.object({
  id: z.string().uuid(),
  urlId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  dishId: z.string(),
})

export type Photo = z.infer<typeof PhotoSchema>

// PHOTO OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const PhotoOptionalDefaultsSchema = PhotoSchema.merge(z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type PhotoOptionalDefaults = z.infer<typeof PhotoOptionalDefaultsSchema>

// PHOTO RELATION SCHEMA
//------------------------------------------------------

export type PhotoRelations = {
  dish: DishWithRelations;
};

export type PhotoWithRelations = z.infer<typeof PhotoSchema> & PhotoRelations

export const PhotoWithRelationsSchema: z.ZodType<PhotoWithRelations> = PhotoSchema.merge(z.object({
  dish: z.lazy(() => DishWithRelationsSchema),
}))

// PHOTO OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type PhotoOptionalDefaultsRelations = {
  dish: DishOptionalDefaultsWithRelations;
};

export type PhotoOptionalDefaultsWithRelations = z.infer<typeof PhotoOptionalDefaultsSchema> & PhotoOptionalDefaultsRelations

export const PhotoOptionalDefaultsWithRelationsSchema: z.ZodType<PhotoOptionalDefaultsWithRelations> = PhotoOptionalDefaultsSchema.merge(z.object({
  dish: z.lazy(() => DishOptionalDefaultsWithRelationsSchema),
}))

/////////////////////////////////////////
// VISIT HISTORY SCHEMA
/////////////////////////////////////////

export const VisitHistorySchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  dishId: z.string(),
  userId: z.string(),
  visitDate: z.coerce.date(),
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
  dish: DishWithRelations;
  user: UserWithRelations;
};

export type VisitHistoryWithRelations = z.infer<typeof VisitHistorySchema> & VisitHistoryRelations

export const VisitHistoryWithRelationsSchema: z.ZodType<VisitHistoryWithRelations> = VisitHistorySchema.merge(z.object({
  dish: z.lazy(() => DishWithRelationsSchema),
  user: z.lazy(() => UserWithRelationsSchema),
}))

// VISIT HISTORY OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type VisitHistoryOptionalDefaultsRelations = {
  dish: DishOptionalDefaultsWithRelations;
  user: UserOptionalDefaultsWithRelations;
};

export type VisitHistoryOptionalDefaultsWithRelations = z.infer<typeof VisitHistoryOptionalDefaultsSchema> & VisitHistoryOptionalDefaultsRelations

export const VisitHistoryOptionalDefaultsWithRelationsSchema: z.ZodType<VisitHistoryOptionalDefaultsWithRelations> = VisitHistoryOptionalDefaultsSchema.merge(z.object({
  dish: z.lazy(() => DishOptionalDefaultsWithRelationsSchema),
  user: z.lazy(() => UserOptionalDefaultsWithRelationsSchema),
}))

/////////////////////////////////////////
// TRAIT SCHEMA
/////////////////////////////////////////

export const TraitSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Trait = z.infer<typeof TraitSchema>

// TRAIT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const TraitOptionalDefaultsSchema = TraitSchema.merge(z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type TraitOptionalDefaults = z.infer<typeof TraitOptionalDefaultsSchema>

// TRAIT RELATION SCHEMA
//------------------------------------------------------

export type TraitRelations = {
  dishScores: DishTraitScoreWithRelations[];
};

export type TraitWithRelations = z.infer<typeof TraitSchema> & TraitRelations

export const TraitWithRelationsSchema: z.ZodType<TraitWithRelations> = TraitSchema.merge(z.object({
  dishScores: z.lazy(() => DishTraitScoreWithRelationsSchema).array(),
}))

// TRAIT OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type TraitOptionalDefaultsRelations = {
  dishScores: DishTraitScoreOptionalDefaultsWithRelations[];
};

export type TraitOptionalDefaultsWithRelations = z.infer<typeof TraitOptionalDefaultsSchema> & TraitOptionalDefaultsRelations

export const TraitOptionalDefaultsWithRelationsSchema: z.ZodType<TraitOptionalDefaultsWithRelations> = TraitOptionalDefaultsSchema.merge(z.object({
  dishScores: z.lazy(() => DishTraitScoreOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// DISH TRAIT SCORE SCHEMA
/////////////////////////////////////////

export const DishTraitScoreSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  dishId: z.string(),
  traidId: z.string(),
  score: z.number().gte(0).lte(99),
})

export type DishTraitScore = z.infer<typeof DishTraitScoreSchema>

// DISH TRAIT SCORE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const DishTraitScoreOptionalDefaultsSchema = DishTraitScoreSchema.merge(z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type DishTraitScoreOptionalDefaults = z.infer<typeof DishTraitScoreOptionalDefaultsSchema>

// DISH TRAIT SCORE RELATION SCHEMA
//------------------------------------------------------

export type DishTraitScoreRelations = {
  dish: DishWithRelations;
  trait: TraitWithRelations;
};

export type DishTraitScoreWithRelations = z.infer<typeof DishTraitScoreSchema> & DishTraitScoreRelations

export const DishTraitScoreWithRelationsSchema: z.ZodType<DishTraitScoreWithRelations> = DishTraitScoreSchema.merge(z.object({
  dish: z.lazy(() => DishWithRelationsSchema),
  trait: z.lazy(() => TraitWithRelationsSchema),
}))

// DISH TRAIT SCORE OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type DishTraitScoreOptionalDefaultsRelations = {
  dish: DishOptionalDefaultsWithRelations;
  trait: TraitOptionalDefaultsWithRelations;
};

export type DishTraitScoreOptionalDefaultsWithRelations = z.infer<typeof DishTraitScoreOptionalDefaultsSchema> & DishTraitScoreOptionalDefaultsRelations

export const DishTraitScoreOptionalDefaultsWithRelationsSchema: z.ZodType<DishTraitScoreOptionalDefaultsWithRelations> = DishTraitScoreOptionalDefaultsSchema.merge(z.object({
  dish: z.lazy(() => DishOptionalDefaultsWithRelationsSchema),
  trait: z.lazy(() => TraitOptionalDefaultsWithRelationsSchema),
}))

/////////////////////////////////////////
// ROUTE STEP SCHEMA
/////////////////////////////////////////

export const RouteStepSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  restaurantId: z.string(),
  nextStepId: z.string().nullable(),
})

export type RouteStep = z.infer<typeof RouteStepSchema>

// ROUTE STEP OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const RouteStepOptionalDefaultsSchema = RouteStepSchema.merge(z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type RouteStepOptionalDefaults = z.infer<typeof RouteStepOptionalDefaultsSchema>

// ROUTE STEP RELATION SCHEMA
//------------------------------------------------------

export type RouteStepRelations = {
  restaurant: RestaurantWithRelations;
  previousStep?: RouteStepWithRelations | null;
  nextStep?: RouteStepWithRelations | null;
};

export type RouteStepWithRelations = z.infer<typeof RouteStepSchema> & RouteStepRelations

export const RouteStepWithRelationsSchema: z.ZodType<RouteStepWithRelations> = RouteStepSchema.merge(z.object({
  restaurant: z.lazy(() => RestaurantWithRelationsSchema),
  previousStep: z.lazy(() => RouteStepWithRelationsSchema).nullable(),
  nextStep: z.lazy(() => RouteStepWithRelationsSchema).nullable(),
}))

// ROUTE STEP OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type RouteStepOptionalDefaultsRelations = {
  restaurant: RestaurantOptionalDefaultsWithRelations;
  previousStep?: RouteStepOptionalDefaultsWithRelations | null;
  nextStep?: RouteStepOptionalDefaultsWithRelations | null;
};

export type RouteStepOptionalDefaultsWithRelations = z.infer<typeof RouteStepOptionalDefaultsSchema> & RouteStepOptionalDefaultsRelations

export const RouteStepOptionalDefaultsWithRelationsSchema: z.ZodType<RouteStepOptionalDefaultsWithRelations> = RouteStepOptionalDefaultsSchema.merge(z.object({
  restaurant: z.lazy(() => RestaurantOptionalDefaultsWithRelationsSchema),
  previousStep: z.lazy(() => RouteStepOptionalDefaultsWithRelationsSchema).nullable(),
  nextStep: z.lazy(() => RouteStepOptionalDefaultsWithRelationsSchema).nullable(),
}))

/////////////////////////////////////////
// TAG RESTAURANT SCHEMA
/////////////////////////////////////////

export const TagRestaurantSchema = z.object({
  id: z.string().uuid(),
  label: z.string().min(1),
})

export type TagRestaurant = z.infer<typeof TagRestaurantSchema>

// TAG RESTAURANT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const TagRestaurantOptionalDefaultsSchema = TagRestaurantSchema.merge(z.object({
  id: z.string().uuid().optional(),
}))

export type TagRestaurantOptionalDefaults = z.infer<typeof TagRestaurantOptionalDefaultsSchema>

// TAG RESTAURANT RELATION SCHEMA
//------------------------------------------------------

export type TagRestaurantRelations = {
  restaurants: RestaurantWithRelations[];
};

export type TagRestaurantWithRelations = z.infer<typeof TagRestaurantSchema> & TagRestaurantRelations

export const TagRestaurantWithRelationsSchema: z.ZodType<TagRestaurantWithRelations> = TagRestaurantSchema.merge(z.object({
  restaurants: z.lazy(() => RestaurantWithRelationsSchema).array(),
}))

// TAG RESTAURANT OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type TagRestaurantOptionalDefaultsRelations = {
  restaurants: RestaurantOptionalDefaultsWithRelations[];
};

export type TagRestaurantOptionalDefaultsWithRelations = z.infer<typeof TagRestaurantOptionalDefaultsSchema> & TagRestaurantOptionalDefaultsRelations

export const TagRestaurantOptionalDefaultsWithRelationsSchema: z.ZodType<TagRestaurantOptionalDefaultsWithRelations> = TagRestaurantOptionalDefaultsSchema.merge(z.object({
  restaurants: z.lazy(() => RestaurantOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// TAG DISH SCHEMA
/////////////////////////////////////////

export const TagDishSchema = z.object({
  id: z.string().uuid(),
  label: z.string().min(1),
})

export type TagDish = z.infer<typeof TagDishSchema>

// TAG DISH OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const TagDishOptionalDefaultsSchema = TagDishSchema.merge(z.object({
  id: z.string().uuid().optional(),
}))

export type TagDishOptionalDefaults = z.infer<typeof TagDishOptionalDefaultsSchema>

// TAG DISH RELATION SCHEMA
//------------------------------------------------------

export type TagDishRelations = {
  dishes: DishWithRelations[];
};

export type TagDishWithRelations = z.infer<typeof TagDishSchema> & TagDishRelations

export const TagDishWithRelationsSchema: z.ZodType<TagDishWithRelations> = TagDishSchema.merge(z.object({
  dishes: z.lazy(() => DishWithRelationsSchema).array(),
}))

// TAG DISH OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type TagDishOptionalDefaultsRelations = {
  dishes: DishOptionalDefaultsWithRelations[];
};

export type TagDishOptionalDefaultsWithRelations = z.infer<typeof TagDishOptionalDefaultsSchema> & TagDishOptionalDefaultsRelations

export const TagDishOptionalDefaultsWithRelationsSchema: z.ZodType<TagDishOptionalDefaultsWithRelations> = TagDishOptionalDefaultsSchema.merge(z.object({
  dishes: z.lazy(() => DishOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid(),
  urlId: z.string(),
  isStudent: z.boolean(),
  studentId: z.number().gte(200000).lte(999999).nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  lastLogin: z.coerce.date().nullable(),
})

export type User = z.infer<typeof UserSchema>

// USER OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const UserOptionalDefaultsSchema = UserSchema.merge(z.object({
  id: z.string().uuid().optional(),
  isStudent: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  visitHistory: VisitHistoryWithRelations[];
  verifiedAuthMethods: AuthMethodUserVerifiedWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  visitHistory: z.lazy(() => VisitHistoryWithRelationsSchema).array(),
  verifiedAuthMethods: z.lazy(() => AuthMethodUserVerifiedWithRelationsSchema).array(),
}))

// USER OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type UserOptionalDefaultsRelations = {
  visitHistory: VisitHistoryOptionalDefaultsWithRelations[];
  verifiedAuthMethods: AuthMethodUserVerifiedOptionalDefaultsWithRelations[];
};

export type UserOptionalDefaultsWithRelations = z.infer<typeof UserOptionalDefaultsSchema> & UserOptionalDefaultsRelations

export const UserOptionalDefaultsWithRelationsSchema: z.ZodType<UserOptionalDefaultsWithRelations> = UserOptionalDefaultsSchema.merge(z.object({
  visitHistory: z.lazy(() => VisitHistoryOptionalDefaultsWithRelationsSchema).array(),
  verifiedAuthMethods: z.lazy(() => AuthMethodUserVerifiedOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// AUTH METHOD SCHEMA
/////////////////////////////////////////

export const AuthMethodSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string().min(1),
})

export type AuthMethod = z.infer<typeof AuthMethodSchema>

// AUTH METHOD OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const AuthMethodOptionalDefaultsSchema = AuthMethodSchema.merge(z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type AuthMethodOptionalDefaults = z.infer<typeof AuthMethodOptionalDefaultsSchema>

// AUTH METHOD RELATION SCHEMA
//------------------------------------------------------

export type AuthMethodRelations = {
  SigninMethodUserVerified: AuthMethodUserVerifiedWithRelations[];
};

export type AuthMethodWithRelations = z.infer<typeof AuthMethodSchema> & AuthMethodRelations

export const AuthMethodWithRelationsSchema: z.ZodType<AuthMethodWithRelations> = AuthMethodSchema.merge(z.object({
  SigninMethodUserVerified: z.lazy(() => AuthMethodUserVerifiedWithRelationsSchema).array(),
}))

// AUTH METHOD OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type AuthMethodOptionalDefaultsRelations = {
  SigninMethodUserVerified: AuthMethodUserVerifiedOptionalDefaultsWithRelations[];
};

export type AuthMethodOptionalDefaultsWithRelations = z.infer<typeof AuthMethodOptionalDefaultsSchema> & AuthMethodOptionalDefaultsRelations

export const AuthMethodOptionalDefaultsWithRelationsSchema: z.ZodType<AuthMethodOptionalDefaultsWithRelations> = AuthMethodOptionalDefaultsSchema.merge(z.object({
  SigninMethodUserVerified: z.lazy(() => AuthMethodUserVerifiedOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// AUTH METHOD USER VERIFIED SCHEMA
/////////////////////////////////////////

export const AuthMethodUserVerifiedSchema = z.object({
  id: z.string().uuid(),
  updatedAt: z.coerce.date(),
  authMethodId: z.string(),
  userId: z.string(),
  isVerified: z.boolean(),
})

export type AuthMethodUserVerified = z.infer<typeof AuthMethodUserVerifiedSchema>

// AUTH METHOD USER VERIFIED OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const AuthMethodUserVerifiedOptionalDefaultsSchema = AuthMethodUserVerifiedSchema.merge(z.object({
  id: z.string().uuid().optional(),
  updatedAt: z.coerce.date().optional(),
  isVerified: z.boolean().optional(),
}))

export type AuthMethodUserVerifiedOptionalDefaults = z.infer<typeof AuthMethodUserVerifiedOptionalDefaultsSchema>

// AUTH METHOD USER VERIFIED RELATION SCHEMA
//------------------------------------------------------

export type AuthMethodUserVerifiedRelations = {
  authMethod: AuthMethodWithRelations;
  user: UserWithRelations;
};

export type AuthMethodUserVerifiedWithRelations = z.infer<typeof AuthMethodUserVerifiedSchema> & AuthMethodUserVerifiedRelations

export const AuthMethodUserVerifiedWithRelationsSchema: z.ZodType<AuthMethodUserVerifiedWithRelations> = AuthMethodUserVerifiedSchema.merge(z.object({
  authMethod: z.lazy(() => AuthMethodWithRelationsSchema),
  user: z.lazy(() => UserWithRelationsSchema),
}))

// AUTH METHOD USER VERIFIED OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type AuthMethodUserVerifiedOptionalDefaultsRelations = {
  authMethod: AuthMethodOptionalDefaultsWithRelations;
  user: UserOptionalDefaultsWithRelations;
};

export type AuthMethodUserVerifiedOptionalDefaultsWithRelations = z.infer<typeof AuthMethodUserVerifiedOptionalDefaultsSchema> & AuthMethodUserVerifiedOptionalDefaultsRelations

export const AuthMethodUserVerifiedOptionalDefaultsWithRelationsSchema: z.ZodType<AuthMethodUserVerifiedOptionalDefaultsWithRelations> = AuthMethodUserVerifiedOptionalDefaultsSchema.merge(z.object({
  authMethod: z.lazy(() => AuthMethodOptionalDefaultsWithRelationsSchema),
  user: z.lazy(() => UserOptionalDefaultsWithRelationsSchema),
}))
