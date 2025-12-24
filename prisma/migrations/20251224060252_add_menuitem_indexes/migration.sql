-- CreateIndex
CREATE INDEX "MenuItem_userId_category_idx" ON "MenuItem"("userId", "category");

-- CreateIndex
CREATE INDEX "MenuItem_category_isAvailable_idx" ON "MenuItem"("category", "isAvailable");
