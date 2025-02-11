/*
  Warnings:

  - You are about to alter the column `name` on the `Todo` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `hours` on the `Todo` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(5)`.

*/
-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "hours" SET DATA TYPE VARCHAR(5);

-- CreateIndex
CREATE INDEX "Todo_userId_idx" ON "Todo"("userId");

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
