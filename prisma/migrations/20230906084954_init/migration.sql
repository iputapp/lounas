-- CreateTable
CREATE TABLE "Restaurant" (
    "id" TEXT NOT NULL,
    "urlId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT,
    "website" TEXT,
    "longtitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "travelTime" INTEGER NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dish" (
    "id" TEXT NOT NULL,
    "urlId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "eatTime" INTEGER NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "thumbnailId" TEXT NOT NULL,

    CONSTRAINT "Dish_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL,
    "urlId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dishId" TEXT NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisitHistory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dishId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "visitDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VisitHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trait" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trait_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DishTraitScore" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dishId" TEXT NOT NULL,
    "traidId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "DishTraitScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RouteStep" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "nextStepId" TEXT,

    CONSTRAINT "RouteStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagRestaurant" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "TagRestaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagDish" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "TagDish_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "urlId" TEXT NOT NULL,
    "isStudent" BOOLEAN NOT NULL DEFAULT true,
    "studentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLogin" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthMethod" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AuthMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthMethodUserVerified" (
    "id" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authMethodId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AuthMethodUserVerified_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RestaurantToTagRestaurant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DishToTagDish" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PaymentMethodToRestaurant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_urlId_key" ON "Restaurant"("urlId");

-- CreateIndex
CREATE UNIQUE INDEX "Dish_urlId_key" ON "Dish"("urlId");

-- CreateIndex
CREATE UNIQUE INDEX "Photo_urlId_key" ON "Photo"("urlId");

-- CreateIndex
CREATE UNIQUE INDEX "RouteStep_nextStepId_key" ON "RouteStep"("nextStepId");

-- CreateIndex
CREATE UNIQUE INDEX "User_urlId_key" ON "User"("urlId");

-- CreateIndex
CREATE UNIQUE INDEX "User_studentId_key" ON "User"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "_RestaurantToTagRestaurant_AB_unique" ON "_RestaurantToTagRestaurant"("A", "B");

-- CreateIndex
CREATE INDEX "_RestaurantToTagRestaurant_B_index" ON "_RestaurantToTagRestaurant"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DishToTagDish_AB_unique" ON "_DishToTagDish"("A", "B");

-- CreateIndex
CREATE INDEX "_DishToTagDish_B_index" ON "_DishToTagDish"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PaymentMethodToRestaurant_AB_unique" ON "_PaymentMethodToRestaurant"("A", "B");

-- CreateIndex
CREATE INDEX "_PaymentMethodToRestaurant_B_index" ON "_PaymentMethodToRestaurant"("B");

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitHistory" ADD CONSTRAINT "VisitHistory_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitHistory" ADD CONSTRAINT "VisitHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DishTraitScore" ADD CONSTRAINT "DishTraitScore_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DishTraitScore" ADD CONSTRAINT "DishTraitScore_traidId_fkey" FOREIGN KEY ("traidId") REFERENCES "Trait"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteStep" ADD CONSTRAINT "RouteStep_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteStep" ADD CONSTRAINT "RouteStep_nextStepId_fkey" FOREIGN KEY ("nextStepId") REFERENCES "RouteStep"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthMethodUserVerified" ADD CONSTRAINT "AuthMethodUserVerified_authMethodId_fkey" FOREIGN KEY ("authMethodId") REFERENCES "AuthMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthMethodUserVerified" ADD CONSTRAINT "AuthMethodUserVerified_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RestaurantToTagRestaurant" ADD CONSTRAINT "_RestaurantToTagRestaurant_A_fkey" FOREIGN KEY ("A") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RestaurantToTagRestaurant" ADD CONSTRAINT "_RestaurantToTagRestaurant_B_fkey" FOREIGN KEY ("B") REFERENCES "TagRestaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DishToTagDish" ADD CONSTRAINT "_DishToTagDish_A_fkey" FOREIGN KEY ("A") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DishToTagDish" ADD CONSTRAINT "_DishToTagDish_B_fkey" FOREIGN KEY ("B") REFERENCES "TagDish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PaymentMethodToRestaurant" ADD CONSTRAINT "_PaymentMethodToRestaurant_A_fkey" FOREIGN KEY ("A") REFERENCES "PaymentMethod"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PaymentMethodToRestaurant" ADD CONSTRAINT "_PaymentMethodToRestaurant_B_fkey" FOREIGN KEY ("B") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
