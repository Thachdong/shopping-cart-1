/*
  Warnings:

  - Added the required column `quantity` to the `Variant_Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Variant_Cart" ADD COLUMN     "quantity" INTEGER NOT NULL;
