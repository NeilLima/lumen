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

export default function EstoqueModalComp({
  modalAberto,
  editandoId,
  formData,
  data,
  itensCompra,
  formatarValor,
  onFecharModal,
  onAtualizarForm,
  onSalvarItem,
  onSelecionarCompraItem,
}: EstoqueModalProps) {
  // Calcula os valores do modal
  const { preco, quantidade, totalEstoque } = calcularCalculosModal(formData);

  const formatarDataCurta = (iso: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('pt-BR');
  };

  return (
    <StyledModalOverlay $visible={modalAberto} onClick={onFecharModal}>
      <StyledModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>{editandoId ? 'Editar Item' : 'Novo Item de Estoque'}</StyledModalTitle>
          <StyledModalClose onClick={onFecharModal}>✕</StyledModalClose>
        </StyledModalHeader>

        <StyledForm>
          <StyledFormGroup>
            <StyledLabel>Puxar item da compra (opcional)</StyledLabel>
            <StyledFormSelect
              value={formData.compraItemId}
              onChange={e => onSelecionarCompraItem(e.target.value)}
              data-testid="estoque-compra-item-select"
            >
              <option value="">Selecione um item comprado...</option>
              {itensCompra.map(item => (
                <option key={item.id} value={item.id}>
                  {item.nome}
                  {item.categoria ? ` — ${item.categoria}` : ''}
                  {` • ${item.quantidade} ${item.unidade}`}
                  {` • R$ ${formatarValor(item.preco)}`}
                  {item.localCompra ? ` • ${item.localCompra}` : ''}
                  {item.dataCompra ? ` • ${formatarDataCurta(item.dataCompra)}` : ''}
                </option>
              ))}
            </StyledFormSelect>
            {itensCompra.length === 0 && (
              <small>Nenhum item de compra encontrado. Cadastre uma compra primeiro.</small>
            )}
          </StyledFormGroup>

          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Nome do item *</StyledLabel>
              <StyledInput
                type="text"
                placeholder="Ex: Arroz, Feijão, Óleo..."
                value={formData.nome}
                onChange={e => onAtualizarForm('nome', e.target.value)}
                data-testid="estoque-nome-input"
              />
            </StyledFormGroup>

            <StyledFormGroup>
              <StyledLabel>Categoria</StyledLabel>
              <StyledInput
                type="text"
                value={formData.categoria}
                readOnly
                placeholder="Preenchida automaticamente pela compra"
                data-testid="estoque-categoria-input"
              />
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
                data-testid="estoque-quantidade-input"
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
                data-testid="estoque-minimo-input"
              />
            </StyledFormGroup>
          </StyledFormRow>

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
              data-testid="estoque-preco-input"
            />
          </StyledFormGroup>

          <StyledPreviewValor>
            <span>Total neste estoque:</span>
            <StyledPreviewValorStrong>R$ {formatarValor(totalEstoque)}</StyledPreviewValorStrong>
          </StyledPreviewValor>

          <StyledModalActions>
            <StyledButton $variant="secondary" onClick={onFecharModal}>
              Cancelar
            </StyledButton>
            <StyledButton $variant="primary" onClick={onSalvarItem} data-testid="estoque-salvar-btn">
              {editandoId ? 'Salvar Alterações' : 'Adicionar ao Estoque'}
            </StyledButton>
          </StyledModalActions>
        </StyledForm>
      </StyledModal>
    </StyledModalOverlay>
  );
}
