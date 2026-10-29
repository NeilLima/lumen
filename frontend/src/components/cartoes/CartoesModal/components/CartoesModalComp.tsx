"use client";
import type { CartoesModalProps } from "../types/CartoesModalTypes";
import { StyledModalOverlay, StyledModal, StyledModalHeader, StyledModalTitle, StyledModalClose, StyledForm, StyledFormGroup, StyledLabel, StyledInput, StyledSelect, StyledColorInput, StyledModalActions, StyledButton } from "../styles/CartoesModalStyles";

export default function CartoesModalComp({ modalAberto, editandoId, formData, onFecharModal, onAtualizarForm, onSalvarCartao }: CartoesModalProps) {
  if (!modalAberto) return null;
  return (
    <StyledModalOverlay onClick={onFecharModal}>
      <StyledModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>{editandoId ? "Editar Cartao" : "Novo Cartao"}</StyledModalTitle>
          <StyledModalClose onClick={onFecharModal}>✕</StyledModalClose>
        </StyledModalHeader>
        <StyledForm>
          <StyledFormGroup><StyledLabel>Nome</StyledLabel><StyledInput value={formData.nome} onChange={e => onAtualizarForm("nome", e.target.value)} /></StyledFormGroup>
          <StyledFormGroup><StyledLabel>Bandeira</StyledLabel><StyledSelect value={formData.bandeira} onChange={e => onAtualizarForm("bandeira", e.target.value)}>
            <option value="visa">Visa</option><option value="mastercard">Mastercard</option><option value="elo">Elo</option><option value="amex">Amex</option>
          </StyledSelect></StyledFormGroup>
          <StyledFormGroup><StyledLabel>Banco</StyledLabel><StyledInput value={formData.banco} onChange={e => onAtualizarForm("banco", e.target.value)} /></StyledFormGroup>
          <StyledFormGroup><StyledLabel>Limite Total</StyledLabel><StyledInput type="number" value={formData.limiteTotal} onChange={e => onAtualizarForm("limiteTotal", e.target.value)} /></StyledFormGroup>
          <StyledFormGroup><StyledLabel>Melhor Dia</StyledLabel><StyledInput type="number" min="1" max="31" value={formData.melhorDiaCompra} onChange={e => onAtualizarForm("melhorDiaCompra", e.target.value)} /></StyledFormGroup>
          <StyledFormGroup><StyledLabel>Vencimento</StyledLabel><StyledInput type="number" min="1" max="31" value={formData.dataVencimento} onChange={e => onAtualizarForm("dataVencimento", e.target.value)} /></StyledFormGroup>
          <StyledFormGroup><StyledLabel>Cor</StyledLabel><StyledColorInput type="color" value={formData.cor} onChange={e => onAtualizarForm("cor", e.target.value)} /></StyledFormGroup>
          <StyledModalActions>
            <StyledButton onClick={onFecharModal}>Cancelar</StyledButton>
            <StyledButton onClick={onSalvarCartao}>{editandoId ? "Salvar" : "Criar"}</StyledButton>
          </StyledModalActions>
        </StyledForm>
      </StyledModal>
    </StyledModalOverlay>
  );
}
