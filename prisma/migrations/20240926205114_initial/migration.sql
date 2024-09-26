/*
  Warnings:

  - You are about to drop the column `roomName` on the `conversations` table. All the data in the column will be lost.
  - You are about to drop the column `recipient` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `messages` table. All the data in the column will be lost.
  - Added the required column `userId` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "conversations" DROP COLUMN "roomName";

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "recipient",
DROP COLUMN "userName",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
