-- AlterTable
ALTER TABLE "Settings" ADD COLUMN     "bakongPayments" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bakongAccountId" TEXT;
