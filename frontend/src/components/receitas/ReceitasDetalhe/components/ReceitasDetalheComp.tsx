'use client';

import type { ReceitasDetalheProps } from '../types/ReceitasDetalheTypes';
import {
  StyledDetalheOverlay,
  StyledDetalheModal,
  StyledModalHeader,
  StyledModalTitle,
  StyledModalClose,
  StyledDetalheHeader,
  StyledDetalheIcon,
  StyledDetalheNome,
  StyledDetalheGrid,
  StyledDetalheItem,
  StyledDetalheLabel,
  StyledDetalheValue,
  StyledDetalheObservacoes,
  StyledStatusBadge,
  StyledModalActions,
  StyledButton,
} from '../styles/ReceitasDetalheStyles';

export default function ReceitasDetalheComp({
  detalheReceita,
  formatarValor,
  formatarData,
  getStatusCor,
  getStatusLabel,
  getRecorrenciaLabel,
  onFecharDetalhe,
  onEditar,
}: ReceitasDetalheProps) {
  return (
    <StyledDetalheOverlay $visible={!!detalheReceita} onClick={onFecharDetalhe}>
      <StyledDetalheModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>Detalhes da Receita</StyledModalTitle>
            <StyledModalClose
              onClick={onFecharDetalhe}
              data-testid="receitas-detalhe-fechar-x"
            >
              ✕
            </StyledModalClose>
        </StyledModalHeader>

        {detalheReceita && (
          <>
            <StyledDetalheHeader>
              <StyledDetalheIcon $color={detalheReceita.categoriaCor}>
                {detalheReceita.categoriaIcone}
              </StyledDetalheIcon>
              <StyledDetalheNome>{detalheReceita.nome}</StyledDetalheNome>
            </StyledDetalheHeader>

            <StyledDetalheGrid>
              <StyledDetalheItem>
                <StyledDetalheLabel>Valor</StyledDetalheLabel>
                <StyledDetalheValue>R$ {formatarValor(detalheReceita.valor)}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Categoria</StyledDetalheLabel>
                <StyledDetalheValue>{detalheReceita.categoria}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Conta</StyledDetalheLabel>
                <StyledDetalheValue>{detalheReceita.conta}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Data</StyledDetalheLabel>
                <StyledDetalheValue>{formatarData(detalheReceita.data)}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Recorrência</StyledDetalheLabel>
                <StyledDetalheValue>{getRecorrenciaLabel(detalheReceita.recorrencia)}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Status</StyledDetalheLabel>
                <StyledStatusBadge $color={getStatusCor(detalheReceita.status)}>
                  {getStatusLabel(detalheReceita.status)}
                </StyledStatusBadge>
              </StyledDetalheItem>
            </StyledDetalheGrid>

            {detalheReceita.observacoes && (
              <StyledDetalheObservacoes>
                <StyledDetalheLabel>Observações</StyledDetalheLabel>
                <StyledDetalheValue>{detalheReceita.observacoes}</StyledDetalheValue>
              </StyledDetalheObservacoes>
            )}

            <StyledModalActions>
              <StyledButton
                $variant="secondary"
                onClick={onFecharDetalhe}
                data-testid="receitas-detalhe-fechar"
              >
                Fechar
              </StyledButton>
              <StyledButton
                $variant="primary"
                onClick={() => onEditar(detalheReceita)}
                data-testid="receitas-detalhe-editar"
              >
                Editar
              </StyledButton>
            </StyledModalActions>
          </>
        )}
      </StyledDetalheModal>
    </StyledDetalheOverlay>
  );
}