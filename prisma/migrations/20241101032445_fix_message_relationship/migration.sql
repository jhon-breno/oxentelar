/*
  Warnings:

  - Added the required column `complement` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "complement" TEXT NOT NULL,
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "number" INTEGER NOT NULL;
