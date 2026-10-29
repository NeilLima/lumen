"use client";
import type { CartoesDetalheProps } from "../types/CartoesDetalheTypes";
import { StyledDetalheOverlay, StyledDetalheModal, StyledModalHeader, StyledModalTitle, StyledModalClose, StyledDetalheContent, StyledDetalheRow, StyledDetalheLabel, StyledDetalheValue, StyledModalActions, StyledButton } from "../styles/CartoesDetalheStyles";

export default function CartoesDetalheComp({ detalheCartao, formatarValor, getBandeiraLabel, getBandeiraCor, getStatusLabel, getStatusCor, formatarLimite, onFecharDetalhe, onEditar }: CartoesDetalheProps) {
  if (!detalheCartao) return null;
  return (
    <StyledDetalheOverlay onClick={onFecharDetalhe}>
      <StyledDetalheModal onClick={e => e.stopPropagation()} style={{ borderTop: "4px solid " + detalheCartao.cor }}>
        <StyledModalHeader>
          <StyledModalTitle>{detalheCartao.nome}</StyledModalTitle>
          <StyledModalClose onClick={onFecharDetalhe}>✕</StyledModalClose>
        </StyledModalHeader>
        <StyledDetalheContent>
          <StyledDetalheRow><StyledDetalheLabel>Bandeira</StyledDetalheLabel><StyledDetalheValue>{getBandeiraLabel(detalheCartao.bandeira)}</StyledDetalheValue></StyledDetalheRow>
          <StyledDetalheRow><StyledDetalheLabel>Banco</StyledDetalheLabel><StyledDetalheValue>{detalheCartao.banco}</StyledDetalheValue></StyledDetalheRow>
          <StyledDetalheRow><StyledDetalheLabel>Limite Total</StyledDetalheLabel><StyledDetalheValue>R$ {formatarLimite(detalheCartao.limiteTotal)}</StyledDetalheValue></StyledDetalheRow>
          <StyledDetalheRow><StyledDetalheLabel>Limite Utilizado</StyledDetalheLabel><StyledDetalheValue>R$ {formatarLimite(detalheCartao.limiteUtilizado)}</StyledDetalheValue></StyledDetalheRow>
          <StyledDetalheRow><StyledDetalheLabel>Disponivel</StyledDetalheLabel><StyledDetalheValue>R$ {formatarLimite(detalheCartao.limiteTotal - detalheCartao.limiteUtilizado)}</StyledDetalheValue></StyledDetalheRow>
          <StyledDetalheRow><StyledDetalheLabel>Vencimento</StyledDetalheLabel><StyledDetalheValue>Dia {detalheCartao.dataVencimento}</StyledDetalheValue></StyledDetalheRow>
          <StyledDetalheRow><StyledDetalheLabel>Status</StyledDetalheLabel><StyledDetalheValue style={{ color: getStatusCor(detalheCartao.status) }}>{getStatusLabel(detalheCartao.status)}</StyledDetalheValue></StyledDetalheRow>
        </StyledDetalheContent>
        <StyledModalActions>
          <StyledButton onClick={onFecharDetalhe}>Fechar</StyledButton>
          <StyledButton onClick={() => onEditar(detalheCartao)}>Editar</StyledButton>
        </StyledModalActions>
      </StyledDetalheModal>
    </StyledDetalheOverlay>
  );
}
