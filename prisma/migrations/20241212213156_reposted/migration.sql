-- CreateTable
CREATE TABLE "repostedcomments" (
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "repostedcomments_pkey" PRIMARY KEY ("userId","commentId")
);

-- CreateTable
CREATE TABLE "ip" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "ip" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,

    CONSTRAINT "ip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ip_ip_key" ON "ip"("ip");

-- AddForeignKey
ALTER TABLE "repostedcomments" ADD CONSTRAINT "repostedcomments_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repostedcomments" ADD CONSTRAINT "repostedcomments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
