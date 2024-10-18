/*
  Warnings:
  - The primary key for the `reposts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `reposts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
*/
-- DropIndex
DROP INDEX "posts_userName_key";

-- AlterTable
ALTER TABLE "reposts" DROP CONSTRAINT "reposts_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "reposts_pkey" PRIMARY KEY ("userId", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
