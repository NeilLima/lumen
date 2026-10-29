'use client';
import type { TransferenciasInfoProps } from '../types/TransferenciasInfoTypes';
import { StyledInfoOverlay, StyledInfoModal, StyledModalHeader, StyledModalTitle, StyledModalClose, StyledInfoIcon, StyledInfoTitle, StyledInfoText, StyledInfoList, StyledInfoListItem, StyledModalActions, StyledButton } from '../styles/TransferenciasInfoStyles';
export default function TransferenciasInfoComp({ modalInfoAberto, onFecharInfo }: TransferenciasInfoProps) {
  return <StyledInfoOverlay $visible={modalInfoAberto} onClick={onFecharInfo}><StyledInfoModal onClick={e => e.stopPropagation()}>
    <StyledModalHeader><StyledModalTitle>Sobre Transferências</StyledModalTitle><StyledModalClose onClick={onFecharInfo}>✕</StyledModalClose></StyledModalHeader>
    <StyledInfoIcon>🔄</StyledInfoIcon><StyledInfoTitle>Transfira entre contas</StyledInfoTitle>
    <StyledInfoText>Registre transferências entre suas contas bancárias, carteira e investimentos.</StyledInfoText>
    <StyledInfoList><StyledInfoListItem>🔄 Transferência entre contas</StyledInfoListItem><StyledInfoListItem>📊 Histórico completo</StyledInfoListItem><StyledInfoListItem>💰 Controle de saldo em tempo real</StyledInfoListItem></StyledInfoList>
    <StyledModalActions><StyledButton onClick={onFecharInfo}>Entendi</StyledButton></StyledModalActions>
  </StyledInfoModal></StyledInfoOverlay>;
}
