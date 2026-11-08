-- DDL para o módulo de estoque
-- Regra 1.4: aplicar com `prisma db execute` (db push trava neste ambiente)

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS estoque_itens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  nome VARCHAR(255) NOT NULL,
  categoria VARCHAR(255) NOT NULL,
  quantidade DECIMAL(14, 2) NOT NULL DEFAULT 0,
  unidade VARCHAR(50) NOT NULL,
  preco DECIMAL(14, 2) NOT NULL DEFAULT 0,
  local_compra VARCHAR(255) NOT NULL,
  quantidade_minima DECIMAL(14, 2) NOT NULL DEFAULT 0,
  data_atualizacao TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_estoque_itens_user_id ON estoque_itens(user_id);