-- Cartoes: status da conta (ativo/bloqueado/cancelado)
ALTER TABLE "credit_cards" ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'ACTIVE';