CREATE TABLE IF NOT EXISTS "metas" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL,
  "nome" TEXT NOT NULL,
  "valorAlvo" DECIMAL(14,2) NOT NULL,
  "valorAtual" DECIMAL(14,2) NOT NULL DEFAULT 0,
  "dataLimite" TEXT NOT NULL,
  "categoria" TEXT NOT NULL,
  "categoriaCor" TEXT,
  "categoriaIcone" TEXT,
  "prioridade" TEXT NOT NULL DEFAULT 'media',
  "status" TEXT NOT NULL DEFAULT 'em_andamento',
  "descricao" TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "metas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS "metas_userId_idx" ON "metas" ("userId");
