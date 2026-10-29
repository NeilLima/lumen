-- Contas: nome do banco e flag de conta ativa
ALTER TABLE "accounts" ADD COLUMN IF NOT EXISTS "bank" TEXT;
ALTER TABLE "accounts" ADD COLUMN IF NOT EXISTS "active" BOOLEAN NOT NULL DEFAULT true;
