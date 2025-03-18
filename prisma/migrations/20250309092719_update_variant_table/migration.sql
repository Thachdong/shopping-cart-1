/*
  Warnings:

  - You are about to drop the column `percentOff` on the `Variant` table. All the data in the column will be lost.
  - Added the required column `discountPercent` to the `Variant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "percentOff",
ADD COLUMN     "discountPercent" INTEGER NOT NULL;
