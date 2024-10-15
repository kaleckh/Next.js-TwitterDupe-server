/*
  Warnings:

  - A unique constraint covering the columns `[userName]` on the table `posts` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "blurhash" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "posts_userName_key" ON "posts"("userName");
