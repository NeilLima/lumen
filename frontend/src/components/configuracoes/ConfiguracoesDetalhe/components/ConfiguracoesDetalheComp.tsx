'use client';

import type { ConfiguracoesDetalheProps } from '../types/ConfiguracoesDetalheTypes';
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
} from '../styles/ConfiguracoesDetalheStyles';

export default function ConfiguracoesDetalheComp({
  detalheConfiguracao,
  formatarValor,
  formatarData,
  getStatusLabel,
  getStatusCor,

  onFecharDetalhe,
  onEditar,
}: ConfiguracoesDetalheProps) {
  if (!detalheConfiguracao) return null;

  

  return (
    <StyledDetalheOverlay $visible={!!detalheConfiguracao} onClick={onFecharDetalhe}>
      <StyledDetalheModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>Detalhes do Configuracao</StyledModalTitle>
          <StyledModalClose onClick={onFecharDetalhe}>✕</StyledModalClose>
        </StyledModalHeader>

        {detalheConfiguracao && (
          <>
            <StyledDetalheHeader>
              <StyledDetalheIcon $color={detalheConfiguracao.categoriaCor}>
                {detalheConfiguracao.categoriaIcone}
              </StyledDetalheIcon>
              <StyledDetalheNome>{detalheConfiguracao.nome}</StyledDetalheNome>
            </StyledDetalheHeader>


            <StyledDetalheGrid>
              <StyledDetalheItem>
                <StyledDetalheLabel>Nome da Configuração *</StyledDetalheLabel>
                <StyledDetalheValue>{detalheConfiguracao.nome}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Categoria</StyledDetalheLabel>
                <StyledStatusBadge $color={getStatusCor(detalheConfiguracao.categoria)}>
                  {getStatusLabel(detalheConfiguracao.categoria)}
                </StyledStatusBadge>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Valor *</StyledDetalheLabel>
                <StyledDetalheValue>{detalheConfiguracao.valor}</StyledDetalheValue>
              </StyledDetalheItem>

            </StyledDetalheGrid>

            {detalheConfiguracao.descricao && (
              <StyledDetalheObservacoes>
                <StyledDetalheLabel>Observações</StyledDetalheLabel>
                <StyledDetalheValue>{detalheConfiguracao.descricao}</StyledDetalheValue>
              </StyledDetalheObservacoes>
            )}

            <StyledModalActions>
              <StyledButton $variant="secondary" onClick={onFecharDetalhe}>
                Fechar
              </StyledButton>
              <StyledButton $variant="primary" onClick={() => onEditar(detalheConfiguracao)}>
                Editar
              </StyledButton>
            </StyledModalActions>
          </>
        )}
      </StyledDetalheModal>
    </StyledDetalheOverlay>
  );
}
