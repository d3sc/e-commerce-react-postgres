/*
  Warnings:

  - You are about to drop the column `cart_itemId` on the `history` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `history` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "history" DROP CONSTRAINT "history_cart_itemId_fkey";

-- AlterTable
ALTER TABLE "history" DROP COLUMN "cart_itemId",
ADD COLUMN     "orderId" INTEGER NOT NULL,
ADD COLUMN     "productId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
