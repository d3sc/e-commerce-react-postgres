/*
  Warnings:

  - You are about to drop the column `userId` on the `Likes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_userId_fkey";

-- AlterTable
ALTER TABLE "Likes" DROP COLUMN "userId";
