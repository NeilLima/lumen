#!/usr/bin/env python3
"""
Diagnostica erros nos arquivos gerados das páginas criadas.
Analisa padrões comuns de erro em arquivos .tsx.
"""

from pathlib import Path
import re

BASE_DIR = Path(__file__).parent.parent.parent
COMPONENTS_DIR = BASE_DIR / "src" / "components"
PAGINAS = ['emprestimos', 'investimentos', 'assinaturas', 'relatorios', 'caridade', 'categorias', 'notificacoes', 'configuracoes', 'ajuda']

# Padrões de erro para procurar
ERROS = [
    # (nome, regex, descrição)
    ("style_faltando_fecha", r"style=\{\{ textAlign: 'right' \}>", "style={{ textAlign: 'right' }} - falta }} no final"),
    ("chave_dupla_fechamento", r"\{detalhe\w+\.\w+\}\}", "Chave dupla de fechamento }} no lugar de }"),
    ("chave_dupla_getStatus", r"\{getStatus\w+\([^)]+\)\}\}", "Chave dupla de fechamento }} após getStatus"),
    ("virgula_inicio_linha", r"^, calcularProgresso", "Vírgula no início da linha (calcularProgresso)"),
    ("pct_cor_mesma_linha", r"const pct = calcularProgresso\(.*; const cor =", "pct e cor na mesma linha (separados por ;)"),
    ("progressbar_indent", r"^            <StyledProgressBar>", "ProgressBar com indentação errada (falta 4 espaços)"),
    ("chave_dupla_nome", r"\{detalhe\w+\.nome\}\}", "{{detalheXxx.nome}} - sobrou }} no final"),
    ("chave_dupla_observacoes", r"\{detalhe\w+\.observacoes\}\}", "{{detalheXxx.observacoes}} - sobrou }} no final"),
    ("chave_dupla_categoriaIcone", r"\{detalhe\w+\.categoriaIcone\}\}", "{{detalheXxx.categoriaIcone}} - sobrou }} no final"),
]

def diagnosticar_arquivo(file_path):
    erros = []
    content = file_path.read_text(encoding='utf-8')
    lines = content.split('\n')
    
    for nome, padrao, descricao in ERROS:
        for i, line in enumerate(lines, 1):
            match = re.search(padrao, line)
            if match:
                erros.append((nome, i, descricao, line.strip()[:80]))
    
    return erros

def main():
    print("=" * 70)
    print("🔍 DIAGNÓSTICO DE ERROS - Páginas Geradas")
    print("=" * 70)
    
    total_erros = 0
    for pasta in PAGINAS:
        dir_path = COMPONENTS_DIR / pasta
        if not dir_path.exists():
            print(f"\n❌ Página {pasta} não encontrada!")
            continue
        
        for file_path in dir_path.rglob('*.tsx'):
            erros = diagnosticar_arquivo(file_path)
            if erros:
                print(f"\n📄 {pasta}/{file_path.name}")
                for nome, linha, descricao, conteudo in erros:
                    print(f"   ⚠️  Linha {linha}: {descricao}")
                    print(f"      → {conteudo}")
                    total_erros += 1
    
    print(f"\n{'=' * 70}")
    if total_erros == 0:
        print("✅ NENHUM ERRO ENCONTRADO! Todas as páginas estão corretas.")
    else:
        print(f"❌ Total de {total_erros} erro(s) encontrado(s) em {len(PAGINAS)} páginas.")
    print("=" * 70)

if __name__ == "__main__":
    main()