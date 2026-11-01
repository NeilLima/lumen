-- Transferencias: conta de destino
ALTER TABLE "transactions" ADD COLUMN IF NOT EXISTS "destinationAccountId" TEXT;