-- CreateEnum
CREATE TYPE "ERoles" AS ENUM ('CUSTOMER', 'ADMIN', 'SELLER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roles" "ERoles"[] DEFAULT ARRAY['CUSTOMER']::"ERoles"[],
ALTER COLUMN "cartId" DROP NOT NULL;
