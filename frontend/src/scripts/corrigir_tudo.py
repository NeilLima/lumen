#!/usr/bin/env python3
"""
Corrige todos os problemas nos arquivos gerados:
1. {{detalheXxx.xxx}} -> {detalheXxx.xxx} (chaves duplas para simples em JSX)
2. {{getStatusLabel(...)}} -> {getStatusLabel(...)}
3. {{detalheXxx && ( -> {detalheXxx && (
4. , calcularProgresso -> calcularProgresso, (vírgula no lugar errado)
5. const pct = ...; const cor = ...; -> separar em linhas
"""

from pathlib import Path

BASE_DIR = Path(__file__).parent.parent.parent
COMPONENTS_DIR = BASE_DIR / "src" / "components"
PAGINAS = ['emprestimos', 'investimentos', 'assinaturas', 'relatorios', 'caridade', 'categorias', 'notificacoes', 'configuracoes', 'ajuda']

def corrigir_arquivo(file_path):
    content = file_path.read_text(encoding='utf-8')
    original = content
    
    if file_path.suffix == '.tsx':
        # 1. Corrigir {{detalheXxx.xxx}} -> {detalheXxx.xxx} em JSX
        # Isso captura {{detalheEmprestimo.nome}} e similares
        import re
        
        # Substituir {{detalhe...}} por {detalhe...} (apenas nos arquivos tsx, não nos estilos)
        # Mas precisamos não quebrar objets como style={{...}}
        content = content.replace('{{detalhe', '{detalhe')
        content = content.replace('{{getStatus', '{getStatus')
        content = content.replace('{{pct}}', '{pct}')
        content = content.replace('{{cor}}', '{cor}')
        
        # 2. Corrigir vírgula no lugar errado
        content = content.replace('\n, calcularProgresso', '\n  calcularProgresso,')
        content = content.replace(', calcularProgresso\n  onFecharDetalhe', 'calcularProgresso,\n  onFecharDetalhe')
        
        # 3. Corrigir {{detalheXxx.xxx}} no final de linhas
        content = content.replace('{{detalhe', '{detalhe')
        content = content.replace('{{getStatus', '{getStatus')
        
        # 4. Corrigir linhas duplicadas de progress_calc
        # A linha com "const pct = ... ; const cor = ..." precisa ser quebrada
        lines = content.split('\n')
        new_lines = []
        for line in lines:
            if 'const pct = calcularProgresso(' in line and '; const cor =' in line:
                # Split the line into two
                pct_part = line.split('; const cor =')[0]
                cor_part = 'const cor =' + line.split('; const cor =')[1]
                new_lines.append(pct_part)
                new_lines.append('  ' + cor_part)
            else:
                new_lines.append(line)
        content = '\n'.join(new_lines)
        
        # 5. Corrigir {{detalheXxx.xxx}} no final de linhas
        # Padrão: {{detalheXxx.xxx}} -> {detalheXxx.xxx}
        content = re.sub(r'\{\{(detalhe\w+\.\w+)\}\}', r'{\1}', content)
        # Padrão: {{getStatusLabel(detalheXxx.xxx)}} -> {getStatusLabel(detalheXxx.xxx)}
        content = re.sub(r'\{\{(getStatus\w+\([^)]+\))\}\}', r'{\1}', content)
        # Padrão: {{detalheXxx.xxx && ( -> {detalheXxx.xxx && (
        content = re.sub(r'\{\{(detalhe\w+\.\w+)\s*&&\s*\(\s*)\}\}', r'{\1}', content)
        
        # 6. Verificar se ainda há {{...}} que deveriam ser {...} em JSX
        # (excluindo style={{...}} que é válido)
        # Corrigir casos específicos
        
    if content != original:
        file_path.write_text(content, encoding='utf-8')
        print(f"✅ Corrigido: {file_path}")
        return True
    return False

def main():
    print("=" * 60)
    print("🔧 Corretor Completo - Lumen")
    print("=" * 60)
    
    total = 0
    for pasta in PAGINAS:
        dir_path = COMPONENTS_DIR / pasta
        if not dir_path.exists():
            continue
        
        for file_path in dir_path.rglob('*.tsx'):
            if corrigir_arquivo(file_path):
                total += 1
    
    print(f"\n📊 Total de arquivos corrigidos: {total}")
    print("🎉 Correção concluída!")
    print("=" * 60)

if __name__ == "__main__":
    main()