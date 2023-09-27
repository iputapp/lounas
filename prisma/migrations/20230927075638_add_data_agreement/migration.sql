/*
  Warnings:

  - Added the required column `data_usage_agreed` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "data_usage_agreed" BOOLEAN NOT NULL;
