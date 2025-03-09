/*
  Warnings:

  - You are about to drop the column `address` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `shippingFee` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `shippingVender` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Cart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "address",
DROP COLUMN "discount",
DROP COLUMN "shippingFee",
DROP COLUMN "shippingVender",
DROP COLUMN "total";
