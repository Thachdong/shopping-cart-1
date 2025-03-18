/*
  Warnings:

  - You are about to drop the `Product_Cart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product_Cart" DROP CONSTRAINT "Product_Cart_cartId_fkey";

-- DropForeignKey
ALTER TABLE "Product_Cart" DROP CONSTRAINT "Product_Cart_productId_fkey";

-- DropTable
DROP TABLE "Product_Cart";

-- CreateTable
CREATE TABLE "Variant_Cart" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" INTEGER NOT NULL,
    "cartId" INTEGER NOT NULL,

    CONSTRAINT "Variant_Cart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Variant_Cart" ADD CONSTRAINT "Variant_Cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant_Cart" ADD CONSTRAINT "Variant_Cart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
