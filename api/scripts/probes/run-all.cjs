/**
 * Executa TODOS os probes do diretorio DE UMA VEZ (regra 15.2).
 * Uso: node scripts/probes/run-all.cjs
 * Exit 0 = todos passaram; exit 1 = algum falhou.
 */
'use strict';

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const probes = fs
  .readdirSync(__dirname)
  .filter((f) => f.endsWith('.cjs') && !f.startsWith('_') && f !== 'run-all.cjs')
  .sort();

if (probes.length === 0) {
  console.error('Nenhum probe encontrado em scripts/probes/');
  process.exit(1);
}

console.log(`Executando ${probes.length} probe(s): ${probes.join(', ')}\n`);

const resultados = [];
for (const probe of probes) {
  const r = spawnSync(process.execPath, [path.join(__dirname, probe)], {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..', '..'),
  });
  resultados.push({ probe, code: r.status === null ? 1 : r.status });
}

console.log('\n========================================');
console.log('RESUMO DA EXECUCAO UNICA');
console.log('========================================');
let falhas = 0;
for (const r of resultados) {
  const ok = r.code === 0;
  if (!ok) falhas++;
  console.log(`${ok ? '✅' : '❌'} ${r.probe} (exit ${r.code})`);
}
console.log('========================================');
process.exit(falhas > 0 ? 1 : 0);
