/*
  Warnings:

  - The `defaultTaxRate` column on the `Settings` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "defaultTaxRate",
ADD COLUMN     "defaultTaxRate" DOUBLE PRECISION NOT NULL DEFAULT 0;
