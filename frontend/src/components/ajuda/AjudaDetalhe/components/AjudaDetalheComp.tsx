'use client';

import type { AjudaDetalheProps } from '../types/AjudaDetalheTypes';
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
} from '../styles/AjudaDetalheStyles';

export default function AjudaDetalheComp({
  detalheAjuda,
  formatarValor,
  formatarData,
  getStatusLabel,
  getStatusCor,

  onFecharDetalhe,
  onEditar,
}: AjudaDetalheProps) {
  if (!detalheAjuda) return null;

  

  return (
    <StyledDetalheOverlay $visible={!!detalheAjuda} onClick={onFecharDetalhe}>
      <StyledDetalheModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>Detalhes do Ajuda</StyledModalTitle>
          <StyledModalClose onClick={onFecharDetalhe}>✕</StyledModalClose>
        </StyledModalHeader>

        {detalheAjuda && (
          <>
            <StyledDetalheHeader>
              <StyledDetalheIcon $color={detalheAjuda.categoriaCor}>
                {detalheAjuda.categoriaIcone}
              </StyledDetalheIcon>
              <StyledDetalheNome>{detalheAjuda.titulo}</StyledDetalheNome>
            </StyledDetalheHeader>


            <StyledDetalheGrid>
              <StyledDetalheItem>
                <StyledDetalheLabel>Título *</StyledDetalheLabel>
                <StyledDetalheValue>{detalheAjuda.titulo}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Categoria</StyledDetalheLabel>
                <StyledDetalheValue>{detalheAjuda.categoria}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Status</StyledDetalheLabel>
                <StyledStatusBadge $color={getStatusCor(detalheAjuda.status)}>
                  {getStatusLabel(detalheAjuda.status)}
                </StyledStatusBadge>
              </StyledDetalheItem>

            </StyledDetalheGrid>

            {detalheAjuda.conteudo && (
              <StyledDetalheObservacoes>
                <StyledDetalheLabel>Observações</StyledDetalheLabel>
                <StyledDetalheValue>{detalheAjuda.conteudo}</StyledDetalheValue>
              </StyledDetalheObservacoes>
            )}

            <StyledModalActions>
              <StyledButton $variant="secondary" onClick={onFecharDetalhe}>
                Fechar
              </StyledButton>
              <StyledButton $variant="primary" onClick={() => onEditar(detalheAjuda)}>
                Editar
              </StyledButton>
            </StyledModalActions>
          </>
        )}
      </StyledDetalheModal>
    </StyledDetalheOverlay>
  );
}
