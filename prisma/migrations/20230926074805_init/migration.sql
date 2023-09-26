/*
  Warnings:

  - You are about to drop the `AuthMethod` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AuthMethodUserVerified` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Dish` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DishTraitScore` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PaymentMethod` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Photo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Restaurant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RouteStep` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TagDish` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TagRestaurant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trait` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VisitHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DishToTagDish` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PaymentMethodToRestaurant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RestaurantToTagRestaurant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AuthMethodUserVerified" DROP CONSTRAINT "AuthMethodUserVerified_authMethodId_fkey";

-- DropForeignKey
ALTER TABLE "AuthMethodUserVerified" DROP CONSTRAINT "AuthMethodUserVerified_userId_fkey";

-- DropForeignKey
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "DishTraitScore" DROP CONSTRAINT "DishTraitScore_dishId_fkey";

-- DropForeignKey
ALTER TABLE "DishTraitScore" DROP CONSTRAINT "DishTraitScore_traidId_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_dishId_fkey";

-- DropForeignKey
ALTER TABLE "RouteStep" DROP CONSTRAINT "RouteStep_nextStepId_fkey";

-- DropForeignKey
ALTER TABLE "RouteStep" DROP CONSTRAINT "RouteStep_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "VisitHistory" DROP CONSTRAINT "VisitHistory_dishId_fkey";

-- DropForeignKey
ALTER TABLE "VisitHistory" DROP CONSTRAINT "VisitHistory_userId_fkey";

-- DropForeignKey
ALTER TABLE "_DishToTagDish" DROP CONSTRAINT "_DishToTagDish_A_fkey";

-- DropForeignKey
ALTER TABLE "_DishToTagDish" DROP CONSTRAINT "_DishToTagDish_B_fkey";

-- DropForeignKey
ALTER TABLE "_PaymentMethodToRestaurant" DROP CONSTRAINT "_PaymentMethodToRestaurant_A_fkey";

-- DropForeignKey
ALTER TABLE "_PaymentMethodToRestaurant" DROP CONSTRAINT "_PaymentMethodToRestaurant_B_fkey";

-- DropForeignKey
ALTER TABLE "_RestaurantToTagRestaurant" DROP CONSTRAINT "_RestaurantToTagRestaurant_A_fkey";

-- DropForeignKey
ALTER TABLE "_RestaurantToTagRestaurant" DROP CONSTRAINT "_RestaurantToTagRestaurant_B_fkey";

-- DropTable
DROP TABLE "AuthMethod";

-- DropTable
DROP TABLE "AuthMethodUserVerified";

-- DropTable
DROP TABLE "Dish";

-- DropTable
DROP TABLE "DishTraitScore";

-- DropTable
DROP TABLE "PaymentMethod";

-- DropTable
DROP TABLE "Photo";

-- DropTable
DROP TABLE "Restaurant";

-- DropTable
DROP TABLE "RouteStep";

-- DropTable
DROP TABLE "TagDish";

-- DropTable
DROP TABLE "TagRestaurant";

-- DropTable
DROP TABLE "Trait";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VisitHistory";

-- DropTable
DROP TABLE "_DishToTagDish";

-- DropTable
DROP TABLE "_PaymentMethodToRestaurant";

-- DropTable
DROP TABLE "_RestaurantToTagRestaurant";

-- CreateTable
CREATE TABLE "restaurants" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "website" TEXT,
    "address" TEXT,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "travel_time" INTEGER NOT NULL,
    "travel_distance" INTEGER NOT NULL,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_tags" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "restaurant_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_opens" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "time_open" TIMETZ(6) NOT NULL,
    "time_close" TIMETZ(6) NOT NULL,
    "week_type_id" INTEGER NOT NULL,
    "restaurant_id" UUID NOT NULL,

    CONSTRAINT "restaurant_opens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "week_types" (
    "id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "week_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "routes" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "step" INTEGER NOT NULL,
    "thumbnail_id" UUID NOT NULL,
    "next_step_id" UUID,
    "previous_step_id" UUID,
    "route_type_id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL,

    CONSTRAINT "routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "route_types" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "route_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL,
    "description" TEXT,
    "payment_type_id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_types" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "payment_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dishes" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "eat_time" INTEGER NOT NULL,
    "restaurant_id" UUID NOT NULL,

    CONSTRAINT "dishes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dish_tags" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "dish_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dish_scores" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" INTEGER NOT NULL,
    "dish_id" UUID NOT NULL,
    "trait_id" UUID NOT NULL,

    CONSTRAINT "dish_scores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dish_traits" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "dish_traits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visit_histories" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "dish_id" UUID NOT NULL,

    CONSTRAINT "visit_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "last_login" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_restaurant_tagging" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_dish_tagging" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE INDEX "restaurants_travel_time_idx" ON "restaurants"("travel_time");

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_opens_week_type_id_restaurant_id_key" ON "restaurant_opens"("week_type_id", "restaurant_id");

-- CreateIndex
CREATE UNIQUE INDEX "week_types_type_key" ON "week_types"("type");

-- CreateIndex
CREATE INDEX "routes_step_idx" ON "routes"("step");

-- CreateIndex
CREATE UNIQUE INDEX "route_types_type_key" ON "route_types"("type");

-- CreateIndex
CREATE UNIQUE INDEX "payments_payment_type_id_restaurant_id_key" ON "payments"("payment_type_id", "restaurant_id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_types_type_key" ON "payment_types"("type");

-- CreateIndex
CREATE INDEX "dishes_price_idx" ON "dishes"("price");

-- CreateIndex
CREATE UNIQUE INDEX "dish_scores_dish_id_trait_id_key" ON "dish_scores"("dish_id", "trait_id");

-- CreateIndex
CREATE UNIQUE INDEX "dish_traits_type_key" ON "dish_traits"("type");

-- CreateIndex
CREATE INDEX "visit_histories_created_at_idx" ON "visit_histories"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE INDEX "users_last_login_idx" ON "users"("last_login");

-- CreateIndex
CREATE UNIQUE INDEX "_restaurant_tagging_AB_unique" ON "_restaurant_tagging"("A", "B");

-- CreateIndex
CREATE INDEX "_restaurant_tagging_B_index" ON "_restaurant_tagging"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_dish_tagging_AB_unique" ON "_dish_tagging"("A", "B");

-- CreateIndex
CREATE INDEX "_dish_tagging_B_index" ON "_dish_tagging"("B");

-- AddForeignKey
ALTER TABLE "restaurant_opens" ADD CONSTRAINT "restaurant_opens_week_type_id_fkey" FOREIGN KEY ("week_type_id") REFERENCES "week_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_opens" ADD CONSTRAINT "restaurant_opens_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routes" ADD CONSTRAINT "routes_route_type_id_fkey" FOREIGN KEY ("route_type_id") REFERENCES "route_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routes" ADD CONSTRAINT "routes_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_payment_type_id_fkey" FOREIGN KEY ("payment_type_id") REFERENCES "payment_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dishes" ADD CONSTRAINT "dishes_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dish_scores" ADD CONSTRAINT "dish_scores_dish_id_fkey" FOREIGN KEY ("dish_id") REFERENCES "dishes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dish_scores" ADD CONSTRAINT "dish_scores_trait_id_fkey" FOREIGN KEY ("trait_id") REFERENCES "dish_traits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visit_histories" ADD CONSTRAINT "visit_histories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visit_histories" ADD CONSTRAINT "visit_histories_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visit_histories" ADD CONSTRAINT "visit_histories_dish_id_fkey" FOREIGN KEY ("dish_id") REFERENCES "dishes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_restaurant_tagging" ADD CONSTRAINT "_restaurant_tagging_A_fkey" FOREIGN KEY ("A") REFERENCES "restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_restaurant_tagging" ADD CONSTRAINT "_restaurant_tagging_B_fkey" FOREIGN KEY ("B") REFERENCES "restaurant_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_dish_tagging" ADD CONSTRAINT "_dish_tagging_A_fkey" FOREIGN KEY ("A") REFERENCES "dishes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_dish_tagging" ADD CONSTRAINT "_dish_tagging_B_fkey" FOREIGN KEY ("B") REFERENCES "dish_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
