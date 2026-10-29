'use client';

import type { InvestimentosDetalheProps } from '../types/InvestimentosDetalheTypes';
import {
  StyledDetalheOverlay,
  StyledDetalheModal,
  StyledModalHeader,
  StyledModalTitle,
  StyledModalClose,
  StyledDetalheHeader,
  StyledDetalheIcon,
  StyledDetalheNome,
  StyledDetalheProgress,
  StyledDetalheBar,
  StyledDetalheFill,
  StyledDetalheProgressInfo,
  StyledDetalheGrid,
  StyledDetalheItem,
  StyledDetalheLabel,
  StyledDetalheValue,
  StyledDetalheObservacoes,
  StyledStatusBadge,
  StyledModalActions,
  StyledButton,
} from '../styles/InvestimentosDetalheStyles';

export default function InvestimentosDetalheComp({
  detalheInvestimento,
  formatarValor,
  formatarData,
  getStatusLabel,
  getStatusCor,

  onFecharDetalhe,
  onEditar,
}: InvestimentosDetalheProps) {
  if (!detalheInvestimento) return null;

  

  return (
    <StyledDetalheOverlay $visible={!!detalheInvestimento} onClick={onFecharDetalhe}>
      <StyledDetalheModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>Detalhes do Investimento</StyledModalTitle>
          <StyledModalClose onClick={onFecharDetalhe}>✕</StyledModalClose>
        </StyledModalHeader>

        {detalheInvestimento && (
          <>
            <StyledDetalheHeader>
              <StyledDetalheIcon $color={detalheInvestimento.categoriaCor}>
                {detalheInvestimento.categoriaIcone}
              </StyledDetalheIcon>
              <StyledDetalheNome>{detalheInvestimento.nome}</StyledDetalheNome>
            </StyledDetalheHeader>


            <StyledDetalheGrid>
              <StyledDetalheItem>
                <StyledDetalheLabel>Nome *</StyledDetalheLabel>
                <StyledDetalheValue>{detalheInvestimento.nome}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Tipo</StyledDetalheLabel>
                <StyledDetalheValue>{detalheInvestimento.tipo}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Valor Aplicado *</StyledDetalheLabel>
                <StyledDetalheValue>{detalheInvestimento.valorAplicado}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Valor Atual *</StyledDetalheLabel>
                <StyledDetalheValue>{detalheInvestimento.valorAtual}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Data de Aplicação *</StyledDetalheLabel>
                <StyledDetalheValue>{detalheInvestimento.dataAplicacao}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Status</StyledDetalheLabel>
                <StyledStatusBadge $color={getStatusCor(detalheInvestimento.status)}>
                  {getStatusLabel(detalheInvestimento.status)}
                </StyledStatusBadge>
              </StyledDetalheItem>

            </StyledDetalheGrid>

            {detalheInvestimento.observacoes && (
              <StyledDetalheObservacoes>
                <StyledDetalheLabel>Observações</StyledDetalheLabel>
                <StyledDetalheValue>{detalheInvestimento.observacoes}</StyledDetalheValue>
              </StyledDetalheObservacoes>
            )}

            <StyledModalActions>
              <StyledButton $variant="secondary" onClick={onFecharDetalhe}>
                Fechar
              </StyledButton>
              <StyledButton $variant="primary" onClick={() => onEditar(detalheInvestimento)}>
                Editar
              </StyledButton>
            </StyledModalActions>
          </>
        )}
      </StyledDetalheModal>
    </StyledDetalheOverlay>
  );
}
