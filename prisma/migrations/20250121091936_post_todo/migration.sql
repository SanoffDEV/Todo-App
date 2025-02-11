/*
  Warnings:

  - You are about to drop the column `Date` on the `todo` table. All the data in the column will be lost.
  - Added the required column `hours` to the `todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "todo" DROP COLUMN "Date",
ADD COLUMN     "hours" INTEGER NOT NULL;
