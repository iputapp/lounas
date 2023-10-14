/*
  Warnings:

  - You are about to drop the column `threshold` on the `dish_traits` table. All the data in the column will be lost.
  - The primary key for the `routes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `step` on the `routes` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `restaurant_id` on the `visit_histories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username,organization_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "visit_histories" DROP CONSTRAINT "visit_histories_restaurant_id_fkey";

-- DropIndex
DROP INDEX "routes_step_idx";

-- DropIndex
DROP INDEX "users_email_key";

-- DropIndex
DROP INDEX "users_username_key";

-- AlterTable
ALTER TABLE "dish_traits" DROP COLUMN "threshold";

-- AlterTable
ALTER TABLE "route_types" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "routes" DROP CONSTRAINT "routes_pkey",
DROP COLUMN "step",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "thumbnail_id" DROP NOT NULL,
ALTER COLUMN "next_step_id" SET DATA TYPE TEXT,
ALTER COLUMN "previous_step_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "routes_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP COLUMN "email",
ADD COLUMN     "organization_id" UUID;

-- AlterTable
ALTER TABLE "visit_histories" DROP COLUMN "restaurant_id";

-- CreateTable
CREATE TABLE "Organization" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "description" TEXT,
    "email_domain" TEXT,
    "is_student" BOOLEAN NOT NULL,
    "is_staff" BOOLEAN NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_name_key" ON "Organization"("name");

-- CreateIndex
CREATE INDEX "routes_id_idx" ON "routes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_organization_id_key" ON "users"("username", "organization_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
