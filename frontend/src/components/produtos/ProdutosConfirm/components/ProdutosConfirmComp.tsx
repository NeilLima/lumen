'use client';

import type { Produto } from '../../main/utils/ProdutosMainUtils';
import { formatarValor } from '@/shared/utils/moeda';
import {
  StyledProdutosConfirmOverlay,
  StyledProdutosConfirm,
  StyledProdutosConfirmIcone,
  StyledProdutosConfirmTitulo,
  StyledProdutosConfirmTexto,
  StyledProdutosConfirmNome,
  StyledProdutosConfirmValor,
  StyledProdutosConfirmAcoes,
  StyledProdutosConfirmBotao,
} from '../styles/ProdutosConfirmStyles';

interface ProdutosConfirmProps {
  exclusaoPendente: Produto | null;
  onCancelar: () => void;
  onConfirmar: () => void;
}

export default function ProdutosConfirmComp({
  exclusaoPendente,
  onCancelar,
  onConfirmar,
}: ProdutosConfirmProps) {
  return (
    <StyledProdutosConfirmOverlay $visible={!!exclusaoPendente} onClick={onCancelar}>
      <StyledProdutosConfirm onClick={e => e.stopPropagation()}>
        <StyledProdutosConfirmIcone>🗑️</StyledProdutosConfirmIcone>
        <StyledProdutosConfirmTitulo>Excluir produto?</StyledProdutosConfirmTitulo>
        {exclusaoPendente && (
          <>
            <StyledProdutosConfirmTexto>
              Você está prestes a remover{' '}
              <StyledProdutosConfirmNome>{exclusaoPendente.nome}</StyledProdutosConfirmNome>.
            </StyledProdutosConfirmTexto>
            <StyledProdutosConfirmTexto>
              Valor:{' '}
              <StyledProdutosConfirmValor>
                R$ {formatarValor(exclusaoPendente.preco)}
              </StyledProdutosConfirmValor>
            </StyledProdutosConfirmTexto>
          </>
        )}
        <StyledProdutosConfirmTexto>Essa ação não pode ser desfeita.</StyledProdutosConfirmTexto>

        <StyledProdutosConfirmAcoes>
          <StyledProdutosConfirmBotao onClick={onCancelar}>Cancelar</StyledProdutosConfirmBotao>
          <StyledProdutosConfirmBotao $variant="primary" onClick={onConfirmar}>
            Sim, excluir
          </StyledProdutosConfirmBotao>
        </StyledProdutosConfirmAcoes>
      </StyledProdutosConfirm>
    </StyledProdutosConfirmOverlay>
  );
}