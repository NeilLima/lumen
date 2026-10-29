'use client';

import type { EmprestimosDetalheProps } from '../types/EmprestimosDetalheTypes';
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
} from '../styles/EmprestimosDetalheStyles';

export default function EmprestimosDetalheComp({
  detalheEmprestimo,
  formatarValor,
  formatarData,
  getStatusLabel,
  getStatusCor,
  calcularProgresso,
  onFecharDetalhe,
  onEditar,
}: EmprestimosDetalheProps) {
  if (!detalheEmprestimo) return null;

  const pct = calcularProgresso(detalheEmprestimo.parcelasPagas, detalheEmprestimo.parcelas)
  const cor = detalheEmprestimo.situacao === 'quitada' ? '#10b981' : detalheEmprestimo.situacao === 'atrasada' ? '#ef4444' : '#3b82f6';

  return (
    <StyledDetalheOverlay $visible={!!detalheEmprestimo} onClick={onFecharDetalhe}>
      <StyledDetalheModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>Detalhes do Emprestimo</StyledModalTitle>
          <StyledModalClose onClick={onFecharDetalhe}>✕</StyledModalClose>
        </StyledModalHeader>

        {detalheEmprestimo && (
          <>
            <StyledDetalheHeader>
              <StyledDetalheIcon $color={detalheEmprestimo.categoriaCor}>
                {detalheEmprestimo.categoriaIcone}
              </StyledDetalheIcon>
              <StyledDetalheNome>{detalheEmprestimo.nome}</StyledDetalheNome>
            </StyledDetalheHeader>


            <StyledDetalheProgress>
              <StyledDetalheBar>
                <StyledDetalheFill $pct={pct} $color={cor} />
              </StyledDetalheBar>
              <StyledDetalheProgressInfo>
                <span>{detalheEmprestimo.parcelasPagas}/{detalheEmprestimo.parcelas} parcelas</span>
                <span>{pct}%</span>
              </StyledDetalheProgressInfo>
            </StyledDetalheProgress>

            <StyledDetalheGrid>
              <StyledDetalheItem>
                <StyledDetalheLabel>Nome *</StyledDetalheLabel>
                <StyledDetalheValue>{detalheEmprestimo.nome}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Tipo</StyledDetalheLabel>
                <StyledDetalheValue>{detalheEmprestimo.tipo}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Valor *</StyledDetalheLabel>
                <StyledDetalheValue>{detalheEmprestimo.valor}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Juros (%)</StyledDetalheLabel>
                <StyledDetalheValue>{detalheEmprestimo.juros}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Parcelas</StyledDetalheLabel>
                <StyledDetalheValue>{detalheEmprestimo.parcelas}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Parcelas Pagas</StyledDetalheLabel>
                <StyledDetalheValue>{detalheEmprestimo.parcelasPagas}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Data de Vencimento *</StyledDetalheLabel>
                <StyledDetalheValue>{detalheEmprestimo.dataVencimento}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Situação</StyledDetalheLabel>
                <StyledStatusBadge $color={getStatusCor(detalheEmprestimo.situacao)}>
                  {getStatusLabel(detalheEmprestimo.situacao)}
                </StyledStatusBadge>
              </StyledDetalheItem>

            </StyledDetalheGrid>

            {detalheEmprestimo.observacoes && (
              <StyledDetalheObservacoes>
                <StyledDetalheLabel>Observações</StyledDetalheLabel>
                <StyledDetalheValue>{detalheEmprestimo.observacoes}</StyledDetalheValue>
              </StyledDetalheObservacoes>
            )}

            <StyledModalActions>
              <StyledButton $variant="secondary" onClick={onFecharDetalhe}>
                Fechar
              </StyledButton>
              <StyledButton $variant="primary" onClick={() => onEditar(detalheEmprestimo)}>
                Editar
              </StyledButton>
            </StyledModalActions>
          </>
        )}
      </StyledDetalheModal>
    </StyledDetalheOverlay>
  );
}
