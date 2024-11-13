/*
  Warnings:

  - You are about to drop the column `Location` on the `Property` table. All the data in the column will be lost.
  - Added the required column `city` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `complement` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "Location",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "complement" TEXT NOT NULL,
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "number" INTEGER NOT NULL,
ADD COLUMN     "recommended" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL;
