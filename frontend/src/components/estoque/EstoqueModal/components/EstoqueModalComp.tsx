'use client';

import type { EstoqueFormData } from '../../main/types/EstoqueTypes';
import type { EstoqueModalProps } from '../types/EstoqueModalTypes';
import { calcularCalculosModal } from '../utils/EstoqueModalUtils';
import {
  StyledModalOverlay,
  StyledModal,
  StyledModalHeader,
  StyledModalTitle,
  StyledModalClose,
  StyledForm,
  StyledFormGroup,
  StyledFormRow,
  StyledLabel,
  StyledInput,
  StyledFormSelect,
  StyledModalActions,
  StyledButton,
  StyledPreviewValor,
  StyledPreviewValorStrong,
} from '../styles/EstoqueModalStyles';

const UNIDADES = [
  { value: 'un', label: 'Unidade' },
  { value: 'kg', label: 'Kg' },
  { value: 'g', label: 'g' },
  { value: 'l', label: 'L' },
  { value: 'ml', label: 'ml' },
];

export default function EstoqueModalComp({
  modalAberto,
  editandoId,
  formData,
  data,
  onFecharModal,
  onAtualizarForm,
  onSalvarItem,
}: EstoqueModalProps) {
  const { preco, quantidade, totalEstoque } = calcularCalculosModal(formData);

  return (
    <StyledModalOverlay $visible={modalAberto} onClick={onFecharModal}>
      <StyledModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>{editandoId ? 'Editar Item' : 'Novo Item de Estoque'}</StyledModalTitle>
          <StyledModalClose onClick={onFecharModal}>✕</StyledModalClose>
        </StyledModalHeader>

        <StyledForm>
          <StyledFormGroup>
            <StyledLabel>Nome do item *</StyledLabel>
            <StyledInput
              type="text"
              placeholder="Ex: Arroz, Feijão, Óleo..."
              value={formData.nome}
              onChange={e => onAtualizarForm('nome', e.target.value)}
            />
          </StyledFormGroup>

          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Categoria *</StyledLabel>
              <StyledFormSelect
                value={formData.categoria}
                onChange={e => onAtualizarForm('categoria', e.target.value)}
              >
                <option value="">Selecione...</option>
                {data.categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </StyledFormSelect>
            </StyledFormGroup>

            <StyledFormGroup>
              <StyledLabel>Local de compra *</StyledLabel>
              <StyledFormSelect
                value={formData.localCompra}
                onChange={e => onAtualizarForm('localCompra', e.target.value)}
              >
                <option value="">Selecione...</option>
                {data.locais.map(local => (
                  <option key={local} value={local}>{local}</option>
                ))}
              </StyledFormSelect>
            </StyledFormGroup>
          </StyledFormRow>

          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Quantidade atual *</StyledLabel>
              <StyledInput
                type="number"
                min="0"
                placeholder="0"
                value={formData.quantidade}
                onChange={e => onAtualizarForm('quantidade', e.target.value)}
              />
            </StyledFormGroup>

            <StyledFormGroup>
              <StyledLabel>Unidade</StyledLabel>
              <StyledFormSelect
                value={formData.unidade}
                onChange={e => onAtualizarForm('unidade', e.target.value)}
              >
                {UNIDADES.map(u => (
                  <option key={u.value} value={u.value}>{u.label}</option>
                ))}
              </StyledFormSelect>
            </StyledFormGroup>
          </StyledFormRow>

          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Preço unitário (R$) *</StyledLabel>
              <StyledInput
                type="text"
                inputMode="numeric"
                placeholder="R$ 0,00"
                value={formData.preco}
                onChange={e => {
                  const digitos = e.target.value.replace(/\D/g, '');
                  onAtualizarForm('preco', digitos ? formatarValor(parseInt(digitos, 10) / 100) : '');
                }}
              />
            </StyledFormGroup>

            <StyledFormGroup>
              <StyledLabel>Estoque mínimo (alerta) *</StyledLabel>
              <StyledInput
                type="number"
                min="0"
                placeholder="0"
                value={formData.quantidadeMinima}
                onChange={e => onAtualizarForm('quantidadeMinima', e.target.value)}
              />
            </StyledFormGroup>
          </StyledFormRow>

          <StyledPreviewValor>
            <span>Total neste estoque:</span>
            <StyledPreviewValorStrong>R$ {formatarValor(totalEstoque)}</StyledPreviewValorStrong>
          </StyledPreviewValor>

          <StyledModalActions>
            <StyledButton $variant="secondary" onClick={onFecharModal}>
              Cancelar
            </StyledButton>
            <StyledButton $variant="primary" onClick={onSalvarItem}>
              {editandoId ? 'Salvar Alterações' : 'Adicionar ao Estoque'}
            </StyledButton>
          </StyledModalActions>
        </StyledForm>
      </StyledModal>
    </StyledModalOverlay>
  );
}
