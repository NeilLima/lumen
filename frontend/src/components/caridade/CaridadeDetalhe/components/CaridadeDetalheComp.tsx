'use client';

import type { CaridadeDetalheProps } from '../types/CaridadeDetalheTypes';
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
} from '../styles/CaridadeDetalheStyles';

export default function CaridadeDetalheComp({
  detalheCaridade,
  formatarValor,
  formatarData,
  getStatusLabel,
  getStatusCor,

  onFecharDetalhe,
  onEditar,
}: CaridadeDetalheProps) {
  if (!detalheCaridade) return null;

  

  return (
    <StyledDetalheOverlay $visible={!!detalheCaridade} onClick={onFecharDetalhe}>
      <StyledDetalheModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>Detalhes do Caridade</StyledModalTitle>
          <StyledModalClose onClick={onFecharDetalhe}>✕</StyledModalClose>
        </StyledModalHeader>

        {detalheCaridade && (
          <>
            <StyledDetalheHeader>
              <StyledDetalheIcon $color={detalheCaridade.categoriaCor}>
                {detalheCaridade.categoriaIcone}
              </StyledDetalheIcon>
              <StyledDetalheNome>{detalheCaridade.nome}</StyledDetalheNome>
            </StyledDetalheHeader>


            <StyledDetalheGrid>
              <StyledDetalheItem>
                <StyledDetalheLabel>Nome *</StyledDetalheLabel>
                <StyledDetalheValue>{detalheCaridade.nome}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Tipo</StyledDetalheLabel>
                <StyledDetalheValue>{detalheCaridade.tipo}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Valor *</StyledDetalheLabel>
                <StyledDetalheValue>{detalheCaridade.valor}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Instituição</StyledDetalheLabel>
                <StyledDetalheValue>{detalheCaridade.instituicao}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Data *</StyledDetalheLabel>
                <StyledDetalheValue>{detalheCaridade.data}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Status</StyledDetalheLabel>
                <StyledStatusBadge $color={getStatusCor(detalheCaridade.status)}>
                  {getStatusLabel(detalheCaridade.status)}
                </StyledStatusBadge>
              </StyledDetalheItem>

            </StyledDetalheGrid>

            {detalheCaridade.observacoes && (
              <StyledDetalheObservacoes>
                <StyledDetalheLabel>Observações</StyledDetalheLabel>
                <StyledDetalheValue>{detalheCaridade.observacoes}</StyledDetalheValue>
              </StyledDetalheObservacoes>
            )}

            <StyledModalActions>
              <StyledButton $variant="secondary" onClick={onFecharDetalhe}>
                Fechar
              </StyledButton>
              <StyledButton $variant="primary" onClick={() => onEditar(detalheCaridade)}>
                Editar
              </StyledButton>
            </StyledModalActions>
          </>
        )}
      </StyledDetalheModal>
    </StyledDetalheOverlay>
  );
}
