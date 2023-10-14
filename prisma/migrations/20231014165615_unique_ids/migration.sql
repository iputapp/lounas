/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `dishes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `restaurants` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `routes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "dishes_id_key" ON "dishes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "restaurants_id_key" ON "restaurants"("id");

-- CreateIndex
CREATE UNIQUE INDEX "routes_id_key" ON "routes"("id");
