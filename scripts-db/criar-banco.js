/* eslint-disable prettier/prettier */
/* Script: cria banco 'lumen' no PostgreSQL local e testa a conexão */
const { Client } = require('pg');

const PGUSER = process.env.PGUSER || 'postgres';
const PGPASSWORD = process.env.PGPASSWORD || '';
const PGHOST = process.env.PGHOST || 'localhost';
const PGPORT = Number(process.env.PGPORT || 5432);
const DB_NAME = process.env.DB_NAME || 'lumen';

function makeClient(database) {
  return new Client({ user: PGUSER, password: PGPASSWORD, host: PGHOST, port: PGPORT, database });
}

async function main() {
  // 1. Conecta no banco "postgres" (default) para criar o banco lumen
  const admin = makeClient('postgres');
  await admin.connect();
  console.log('✅ Conectado ao PostgreSQL em ' + PGHOST + ':' + PGPORT + ' como ' + PGUSER);

  const exists = await admin.query('SELECT 1 FROM pg_database WHERE datname = $1', [DB_NAME]);
  if (exists.rowCount === 0) {
    await admin.query('CREATE DATABASE "' + DB_NAME + '"');
    console.log('✅ Banco de dados "' + DB_NAME + '" criado com sucesso!');
  } else {
    console.log('ℹ️  Banco de dados "' + DB_NAME + '" já existe.');
  }
  await admin.end();

  // 2. Conecta no banco lumen e testa
  const db = makeClient(DB_NAME);
  await db.connect();
  console.log('✅ Conectado ao banco "' + DB_NAME + '"!');

  const res = await db.query('SELECT current_database() AS db, current_user AS usr, version() AS version');
  console.log('📊 Banco: ' + res.rows[0].db + ' | Usuário: ' + res.rows[0].usr);
  console.log('📊 Versão: ' + res.rows[0].version.split(',')[0]);

  // 3. Teste de escrita/leitura (tabela temporária de verificação)
  await db.query('CREATE TABLE IF NOT EXISTS _conexao_teste (id serial PRIMARY KEY, criado_em timestamp DEFAULT now())');
  await db.query('INSERT INTO _conexao_teste DEFAULT VALUES');
  const test = await db.query('SELECT count(*)::int AS total FROM _conexao_teste');
  console.log('✅ Teste de escrita/leitura OK — registros na tabela de teste: ' + test.rows[0].total);
  await db.query('DROP TABLE IF EXISTS _conexao_teste');

  await db.end();
  console.log('🎉 Tudo funcionando! String de conexão:');
  console.log('DATABASE_URL="postgresql://' + PGUSER + ':' + 'SUA_SENHA@' + PGHOST + ':' + PGPORT + '/' + DB_NAME + '?schema=public"');
}

main().catch((err) => {
  console.error('❌ ERRO:', err.message);
  process.exit(1);
});
