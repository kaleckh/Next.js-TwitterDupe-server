/*
  Warnings:

  - You are about to drop the column `me` on the `conversations` table. All the data in the column will be lost.
  - You are about to drop the column `recipient` on the `conversations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "conversations" DROP COLUMN "me",
DROP COLUMN "recipient";

-- CreateTable
CREATE TABLE "UsersInConversations" (
    "conversationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UsersInConversations_pkey" PRIMARY KEY ("conversationId","userId")
);

-- AddForeignKey
ALTER TABLE "UsersInConversations" ADD CONSTRAINT "UsersInConversations_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersInConversations" ADD CONSTRAINT "UsersInConversations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
