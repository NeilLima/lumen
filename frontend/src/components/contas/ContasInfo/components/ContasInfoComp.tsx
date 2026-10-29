'use client';
import type { ContasInfoProps } from '../types/ContasInfoTypes';
import { StyledInfoOverlay, StyledInfoModal, StyledModalHeader, StyledModalTitle, StyledModalClose, StyledInfoIcon, StyledInfoTitle, StyledInfoText, StyledInfoList, StyledInfoListItem, StyledModalActions, StyledButton } from '../styles/ContasInfoStyles';
export default function ContasInfoComp({ modalInfoAberto, onFecharInfo }: ContasInfoProps) {
  return <StyledInfoOverlay $visible={modalInfoAberto} onClick={onFecharInfo}><StyledInfoModal onClick={e => e.stopPropagation()}>
    <StyledModalHeader><StyledModalTitle>Sobre Contas</StyledModalTitle><StyledModalClose onClick={onFecharInfo} data-testid="contas-info-fechar-x">✕</StyledModalClose></StyledModalHeader>
    <StyledInfoIcon>🏦</StyledInfoIcon><StyledInfoTitle>Gerencie suas contas</StyledInfoTitle>
    <StyledInfoText>Cadastre contas correntes, poupança, carteira e digitais.</StyledInfoText>
    <StyledInfoList><StyledInfoListItem>💰 Acompanhe o saldo de cada conta</StyledInfoListItem><StyledInfoListItem>🏦 Diferentes tipos de conta</StyledInfoListItem><StyledInfoListItem>📊 Visão geral do patrimônio</StyledInfoListItem></StyledInfoList>
    <StyledModalActions><StyledButton onClick={onFecharInfo} data-testid="contas-info-entendi">Entendi</StyledButton></StyledModalActions>
  </StyledInfoModal></StyledInfoOverlay>;
}
