/*
  Warnings:

  - Added the required column `variantName` to the `Variant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Variant" ADD COLUMN     "variantName" TEXT NOT NULL;
