-- CreateTable
CREATE TABLE "FlashcardHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "keyword" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "questions" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FlashcardHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FlashcardHistory" ADD CONSTRAINT "FlashcardHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
