'use client';

import type { Produto, ProdutosFiltros } from '../../main/utils/ProdutosMainUtils';
import {
  StyledProdutosCard,
  StyledProdutosCardHeader,
  StyledProdutosCardTitle,
  StyledProdutosFilterBar,
  StyledProdutosSearchInput,
  StyledProdutosSelect,
  StyledProdutosList,
  StyledProdutoItem,
  StyledProdutoIcon,
  StyledProdutoInfo,
  StyledProdutoNome,
  StyledProdutoMeta,
  StyledProdutoCategoria,
  StyledProdutoLocal,
  StyledProdutoValue,
  StyledProdutoActions,
  StyledProdutosButton,
  StyledProdutoIconButton,
  StyledParcelasBadge,
  StyledProdutosEmptyState,
  StyledProdutosEmptyIcon,
  StyledProdutosEmptyTitle,
  StyledProdutosEmptyText,
} from '../styles/ProdutosListStyles';

const ICON_POR_CATEGORIA: Record<string, string> = {
  Alimentos: '🍎',
  Bebidas: '🥤',
  Limpeza: '🧼',
  Higiene: '🧴',
  Eletrônicos: '💻',
  Vestuário: '👕',
  Outros: '📦',
};

const COR_CATEGORIA: Record<string, string> = {
  Alimentos: '#10b981',
  Bebidas: '#3b82f6',
  Limpeza: '#f59e0b',
  Higiene: '#8b5cf6',
  Eletrônicos: '#06b6d4',
  Vestuário: '#ec4899',
  Outros: '#64748b',
};

interface ProdutosListProps {
  produtosFiltrados: Produto[];
  filtros: ProdutosFiltros;
  data: { categorias: string[]; locais: string[] };
  viewMode: 'card' | 'list';
  formatarValor: (valor: number) => string;
  formatarData: (data: string) => string;
  onAtualizarFiltro: (campo: keyof ProdutosFiltros, valor: string) => void;
  onLimparFiltros: () => void;
  onToggleViewMode: () => void;
  onAbrirModalEditar: (produto: Produto) => void;
  onConfirmarExclusao: (produto: Produto) => void;
}

export default function ProdutosListComp({
  produtosFiltrados,
  filtros,
  data,
  viewMode,
  formatarValor,
  formatarData,
  onAtualizarFiltro,
  onLimparFiltros,
  onToggleViewMode,
  onAbrirModalEditar,
  onConfirmarExclusao,
}: ProdutosListProps) {
  const temFiltros = filtros.pesquisa || filtros.categoria || filtros.localCompra;

  return (
    <StyledProdutosCard>
      <StyledProdutosCardHeader>
        <StyledProdutosCardTitle>Lista de Produtos ({produtosFiltrados.length})</StyledProdutosCardTitle>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <StyledProdutosButton $variant={viewMode === 'card' ? 'primary' : 'ghost'} onClick={viewMode !== 'card' ? onToggleViewMode : undefined}>
            ▦ Cards
          </StyledProdutosButton>
          <StyledProdutosButton $variant={viewMode === 'list' ? 'primary' : 'ghost'} onClick={viewMode !== 'list' ? onToggleViewMode : undefined}>
            ☰ Lista
          </StyledProdutosButton>
          {temFiltros && (
            <StyledProdutosButton $variant="ghost" onClick={onLimparFiltros}>
              Limpar filtros
            </StyledProdutosButton>
          )}
        </div>
      </StyledProdutosCardHeader>

      <StyledProdutosFilterBar>
        <StyledProdutosSearchInput
          type="text"
          placeholder="🔍 Pesquisar produtos..."
          value={filtros.pesquisa}
          onChange={e => onAtualizarFiltro('pesquisa', e.target.value)}
        />
        <StyledProdutosSelect
          value={filtros.localCompra}
          onChange={e => onAtualizarFiltro('localCompra', e.target.value)}
        >
          <option value="">Todos os locais</option>
          {data.locais.map(local => (
            <option key={local} value={local}>{local}</option>
          ))}
        </StyledProdutosSelect>
        <StyledProdutosSelect
          value={filtros.categoria}
          onChange={e => onAtualizarFiltro('categoria', e.target.value)}
        >
          <option value="">Todas categorias</option>
          {data.categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </StyledProdutosSelect>
      </StyledProdutosFilterBar>

      {produtosFiltrados.length === 0 ? (
        <StyledProdutosEmptyState>
          <StyledProdutosEmptyIcon>🧾</StyledProdutosEmptyIcon>
          <StyledProdutosEmptyTitle>Nenhum produto encontrado</StyledProdutosEmptyTitle>
          <StyledProdutosEmptyText>
            {temFiltros
              ? 'Tente ajustar os filtros ou escolher outro local.'
              : 'Comece cadastrando seu primeiro produto.'}
          </StyledProdutosEmptyText>
        </StyledProdutosEmptyState>
      ) : viewMode === 'card' ? (
        <StyledProdutosList>
          {produtosFiltrados.map(produto => {
            const cor = COR_CATEGORIA[produto.categoria] || '#64748b';
            const icone = ICON_POR_CATEGORIA[produto.categoria] || '📦';
            const parcela = produto.preco / produto.parcelas;

            return (
              <StyledProdutoItem key={produto.id}>
                <StyledProdutoIcon $color={cor}>{icone}</StyledProdutoIcon>
                <StyledProdutoInfo>
                  <StyledProdutoNome>{produto.nome}</StyledProdutoNome>
                  <StyledProdutoMeta>
                    <StyledProdutoCategoria>{produto.categoria}</StyledProdutoCategoria>
                    <StyledProdutoLocal>• {produto.localCompra}</StyledProdutoLocal>
                    <span>• {formatarData(produto.dataCadastro)}</span>
                    {produto.parcelas > 1 && (
                      <StyledParcelasBadge>
                        {produto.parcelas}x de R$ {formatarValor(parcela)}
                      </StyledParcelasBadge>
                    )}
                  </StyledProdutoMeta>
                </StyledProdutoInfo>
                <StyledProdutoValue>R$ {formatarValor(produto.preco)}</StyledProdutoValue>
                <StyledProdutoActions>
                  <StyledProdutoIconButton title="Editar" onClick={() => onAbrirModalEditar(produto)}>
                    ✏️
                  </StyledProdutoIconButton>
                  <StyledProdutoIconButton title="Excluir" $color="#ef4444" onClick={() => onConfirmarExclusao(produto)}>
                    🗑️
                  </StyledProdutoIconButton>
                </StyledProdutoActions>
              </StyledProdutoItem>
            );
          })}
        </StyledProdutosList>
       ) : (
         <div style={{ overflowX: 'auto' }}>
           <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
             <thead>
               <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                 <th style={{ textAlign: 'left', padding: '12px 8px', color: '#a0a0b0', fontWeight: 600 }}>Produto</th>
                 <th style={{ textAlign: 'left', padding: '12px 8px', color: '#a0a0b0', fontWeight: 600 }}>Categoria</th>
                 <th style={{ textAlign: 'left', padding: '12px 8px', color: '#a0a0b0', fontWeight: 600 }}>Local</th>
                 <th style={{ textAlign: 'right', padding: '12px 8px', color: '#a0a0b0', fontWeight: 600 }}>Preco</th>
                 <th style={{ textAlign: 'center', padding: '12px 8px', color: '#a0a0b0', fontWeight: 600 }}>Parcelas</th>
                 <th style={{ textAlign: 'center', padding: '12px 8px', color: '#a0a0b0', fontWeight: 600 }}>Acoes</th>
               </tr>
             </thead>
             <tbody>
               {produtosFiltrados.map(produto => {
                 const cor = COR_CATEGORIA[produto.categoria] || '#64748b';
                 const icone = ICON_POR_CATEGORIA[produto.categoria] || '📦';
                 const parcela = produto.preco / produto.parcelas;
                 return (
                   <tr key={produto.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                     <td style={{ padding: '12px 8px', color: '#ffffff' }}>
                       <span style={{ marginRight: '8px' }}>{icone}</span>
                       {produto.nome}
                     </td>
                     <td style={{ padding: '12px 8px' }}>
                       <span style={{ color: cor, fontWeight: 500 }}>{produto.categoria}</span>
                     </td>
                     <td style={{ padding: '12px 8px', color: '#a0a0b0' }}>{produto.localCompra}</td>
                     <td style={{ padding: '12px 8px', textAlign: 'right', color: '#ffffff', fontWeight: 600 }}>
                       R$ {formatarValor(produto.preco)}
                     </td>
                     <td style={{ padding: '12px 8px', textAlign: 'center', color: '#a0a0b0' }}>
                       {produto.parcelas > 1 ? `${produto.parcelas}x de R$ ${formatarValor(parcela)}` : '1x'}
                     </td>
                     <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                       <StyledProdutoIconButton title="Editar" onClick={() => onAbrirModalEditar(produto)}>
                         ✏️
                       </StyledProdutoIconButton>
                       <StyledProdutoIconButton title="Excluir" $color="#ef4444" onClick={() => onConfirmarExclusao(produto)}>
                         🗑️
                       </StyledProdutoIconButton>
                     </td>
                   </tr>
                 );
               })}
             </tbody>
           </table>
         </div>
       )}
    </StyledProdutosCard>
  );
}
