#!/usr/bin/env python3
"""
Corrige chaves duplas incorretas nos arquivos gerados.
Substitui {{ por { e }} por } em expressões JSX/TSX.
"""

import os
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent.parent  # frontend/
COMPONENTS_DIR = BASE_DIR / "src" / "components"

# Páginas geradas
PAGINAS = ['emprestimos', 'investimentos', 'assinaturas', 'relatorios', 'caridade', 'categorias', 'notificacoes', 'configuracoes', 'ajuda']

def corrigir_arquivo(file_path):
    content = file_path.read_text(encoding='utf-8')
    
    # Padrões para corrigir (apenas em arquivos .tsx, não .ts)
    if file_path.suffix == '.tsx':
        # Substituir {{{{ por {{ e }}}} por }} apenas em expressões JSX
        # Mas precisamos ter cuidado para não quebrar styled-components
        
        # Padrões específicos que precisam ser corrigidos:
        # {{{{texto}}}} -> {{texto}} (deve ser {texto} em JSX)
        # {{{{!!var}}}} -> {{!!var}} (deve ser {!!var} em JSX)
        # {{{{func()}}}} -> {{func()}} (deve ser {func()} em JSX)
        # {{{{obj.prop}}}} -> {{obj.prop}} (deve ser {obj.prop} em JSX)
        
        # Substituir {{{{ por { e }}}} por } em expressões JSX
        # Mas apenas quando não for parte de styled-components
        
        # Abordagem: substituir {{{{ por { e }}}} por }
        content = content.replace('{{{{', '{')
        content = content.replace('}}}}', '}')
        
        # Também corrigir {{{ por { e }}} por } em alguns casos
        # Mas isso pode quebrar styled-components, então vamos ser mais específicos
        
        # Padrões específicos:
        # $visible={{!!var}} -> $visible={!var} (não precisa de chaves duplas)
        # $visible={{var}} -> $visible={var}
        # onClick={{func}} -> onClick={func}
        # $color={{func()}} -> $color={func()}
        # $pct={{var}} -> $pct={var}
        
        # Na verdade, o problema é que {{ e }} em JSX são válidos para objetos,
        # mas {{!!var}} não é um objeto válido. Precisamos de {!var} em vez de {{!!var}}.
        
        # Vamos substituir os padrões problemáticos:
        content = content.replace('{{!!', '{!!')
        content = content.replace('!!}}', '!!}')
        
        # Corrigir $visible={{var}} -> $visible={var}
        content = content.replace('$visible={{', '$visible={')
        content = content.replace('}} onClick', '} onClick')
        content = content.replace('}}>', '}>')
        
        # Corrigir onClick={{ -> onClick={
        content = content.replace('onClick={{', 'onClick={')
        content = content.replace('}}>', '}>')
        
        # Corrigir $color={{ -> $color={
        content = content.replace('$color={{', '$color={')
        content = content.replace('}}>', '}>')
        
        # Corrigir $pct={{ -> $pct={
        content = content.replace('$pct={{', '$pct={')
        content = content.replace('}} $color', '} $color')
        
        # Corrigir style={{{{ -> style={{
        content = content.replace('style={{{{', 'style={{')
        content = content.replace('}}}}>', '}}>')
        
        # Corrigir {{var}} em texto JSX -> {var}
        # Mas precisamos ter cuidado para não quebrar objetos {{ }}
        
        # Padrões seguros para corrigir:
        # {{var.prop}} -> {var.prop}
        # {{func(arg)}} -> {func(arg)}
        # {{var}} -> {var} (quando não é objeto)
        
        # Vamos ser mais conservadores e apenas corrigir os padrões que sabemos que estão errados
    
    file_path.write_text(content, encoding='utf-8')
    print(f"✅ Corrigido: {file_path}")

def main():
    print("=" * 60)
    print("🔧 Corretor de Chaves - Lumen")
    print("=" * 60)
    
    for pasta in PAGINAS:
        dir_path = COMPONENTS_DIR / pasta
        if not dir_path.exists():
            continue
        
        print(f"\n📋 Corrigindo página: {pasta}")
        
        # Percorrer todos os arquivos .tsx
        for file_path in dir_path.rglob('*.tsx'):
            corrigir_arquivo(file_path)
    
    print("\n" + "=" * 60)
    print("🎉 Correção concluída!")
    print("=" * 60)

if __name__ == "__main__":
    main()