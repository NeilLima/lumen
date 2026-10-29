'use client';

import type { CategoriasDetalheProps } from '../types/CategoriasDetalheTypes';
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
} from '../styles/CategoriasDetalheStyles';

export default function CategoriasDetalheComp({
  detalheCategoria,
  formatarValor,
  formatarData,
  getStatusLabel,
  getStatusCor,

  onFecharDetalhe,
  onEditar,
}: CategoriasDetalheProps) {
  if (!detalheCategoria) return null;

  

  return (
    <StyledDetalheOverlay $visible={!!detalheCategoria} onClick={onFecharDetalhe}>
      <StyledDetalheModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>Detalhes do Categoria</StyledModalTitle>
          <StyledModalClose onClick={onFecharDetalhe}>✕</StyledModalClose>
        </StyledModalHeader>

        {detalheCategoria && (
          <>
            <StyledDetalheHeader>
              <StyledDetalheIcon $color={detalheCategoria.categoriaCor}>
                {detalheCategoria.categoriaIcone}
              </StyledDetalheIcon>
              <StyledDetalheNome>{detalheCategoria.nome}</StyledDetalheNome>
            </StyledDetalheHeader>


            <StyledDetalheGrid>
              <StyledDetalheItem>
                <StyledDetalheLabel>Nome *</StyledDetalheLabel>
                <StyledDetalheValue>{detalheCategoria.nome}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Ícone (Emoji) *</StyledDetalheLabel>
                <StyledDetalheValue>{detalheCategoria.icone}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Cor *</StyledDetalheLabel>
                <StyledDetalheValue>{detalheCategoria.cor}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Tipo</StyledDetalheLabel>
                <StyledStatusBadge $color={getStatusCor(detalheCategoria.tipo)}>
                  {getStatusLabel(detalheCategoria.tipo)}
                </StyledStatusBadge>
              </StyledDetalheItem>

            </StyledDetalheGrid>

            {detalheCategoria.descricao && (
              <StyledDetalheObservacoes>
                <StyledDetalheLabel>Observações</StyledDetalheLabel>
                <StyledDetalheValue>{detalheCategoria.descricao}</StyledDetalheValue>
              </StyledDetalheObservacoes>
            )}

            <StyledModalActions>
              <StyledButton $variant="secondary" onClick={onFecharDetalhe}>
                Fechar
              </StyledButton>
              <StyledButton $variant="primary" onClick={() => onEditar(detalheCategoria)}>
                Editar
              </StyledButton>
            </StyledModalActions>
          </>
        )}
      </StyledDetalheModal>
    </StyledDetalheOverlay>
  );
}
