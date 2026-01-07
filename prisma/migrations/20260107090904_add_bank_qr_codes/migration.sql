-- CreateTable
CREATE TABLE "BankQRCode" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BankQRCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BankQRCode_userId_idx" ON "BankQRCode"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BankQRCode_userId_bankName_key" ON "BankQRCode"("userId", "bankName");

-- AddForeignKey
ALTER TABLE "BankQRCode" ADD CONSTRAINT "BankQRCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
