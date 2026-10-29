-- Adiciona status e comprovante (attachment) as transacoes (receitas)
ALTER TABLE "transactions" ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'PENDING';
ALTER TABLE "transactions" ADD COLUMN IF NOT EXISTS "attachment" TEXT;
