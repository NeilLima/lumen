'use client';

import type { EstoqueItem } from '../../main/types/EstoqueTypes';
import type { EstoqueConfirmProps } from '../types/EstoqueConfirmTypes';
import { formatarValor } from '@/shared/utils/moeda';
import { calcularTotalItem } from '../utils/EstoqueConfirmUtils';
import {
  StyledOverlay,
  StyledConfirm,
  StyledIcone,
  StyledTitulo,
  StyledTexto,
  StyledNomeItem,
  StyledValor,
  StyledAcoes,
  StyledBotao,
} from '../styles/EstoqueConfirmStyles';

export default function EstoqueConfirmComp({
  exclusaoPendente,
  onCancelar,
  onConfirmar,
}: EstoqueConfirmProps) {
  const total = calcularTotalItem(exclusaoPendente);

  return (
    <StyledOverlay $visible={!!exclusaoPendente} onClick={onCancelar}>
      <StyledConfirm onClick={e => e.stopPropagation()}>
        <StyledIcone>🗑️</StyledIcone>
        <StyledTitulo>Excluir item do estoque?</StyledTitulo>
        {exclusaoPendente && (
          <>
            <StyledTexto>
              Você está prestes a remover <StyledNomeItem>{exclusaoPendente.nome}</StyledNomeItem>{' '}
              da dispensa.
            </StyledTexto>
            <StyledTexto>
              Valor em estoque: <StyledValor>R$ {formatarValor(total)}</StyledValor>
            </StyledTexto>
          </>
        )}
        <StyledTexto>Essa ação não pode ser desfeita.</StyledTexto>

        <StyledAcoes>
          <StyledBotao onClick={onCancelar}>Cancelar</StyledBotao>
          <StyledBotao $variant="primary" onClick={onConfirmar}>
            Sim, excluir
          </StyledBotao>
        </StyledAcoes>
      </StyledConfirm>
    </StyledOverlay>
  );
}