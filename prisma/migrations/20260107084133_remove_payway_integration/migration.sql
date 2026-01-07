/*
  Warnings:

  - You are about to drop the column `linkedAccountId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `paymentProvider` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `paywayApv` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `paywayTranId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `qrExpiresAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `qrGeneratedAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `LinkedAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PaymentAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PaymentLinkRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LinkedAccount" DROP CONSTRAINT "LinkedAccount_userId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_linkedAccountId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentAccount" DROP CONSTRAINT "PaymentAccount_userId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentLinkRequest" DROP CONSTRAINT "PaymentLinkRequest_userId_fkey";

-- DropIndex
DROP INDEX "Order_paywayTranId_idx";

-- DropIndex
DROP INDEX "Order_paywayTranId_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "linkedAccountId",
DROP COLUMN "paymentProvider",
DROP COLUMN "paywayApv",
DROP COLUMN "paywayTranId",
DROP COLUMN "qrExpiresAt",
DROP COLUMN "qrGeneratedAt";

-- DropTable
DROP TABLE "LinkedAccount";

-- DropTable
DROP TABLE "PaymentAccount";

-- DropTable
DROP TABLE "PaymentLinkRequest";
