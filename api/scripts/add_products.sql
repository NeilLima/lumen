-- Produtos: catalogo de produtos (comparacao de precos por local)
CREATE TABLE IF NOT EXISTS "products" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "unit" TEXT NOT NULL DEFAULT 'un',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "products" ADD CONSTRAINT "products_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
CREATE INDEX IF NOT EXISTS "products_userId_idx" ON "products"("userId");

-- Estoque: vinculo opcional ao produto
ALTER TABLE "estoque_itens" ADD COLUMN IF NOT EXISTS "productId" TEXT;
ALTER TABLE "estoque_itens" ADD CONSTRAINT "estoque_itens_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;