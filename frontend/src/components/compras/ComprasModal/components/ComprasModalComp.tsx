'use client';

import type { ComprasModalProps } from '../types/ComprasModalTypes';
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
} from '../styles/ComprasModalStyles';

export default function ComprasModalComp({
  modalAberto,
  editandoId,
  formData,
  itemNome,
  itemQtd,
  itemPreco,
  produtos,
  locais,
  onFecharModal,
  onAtualizarForm,
  onSalvarCompra,
  onAddItem,
  onRemoveItem,
  onSetItemNome,
  onSetItemQtd,
  onSetItemPreco,
  onSelectProduct,
  onSelectLocal,
  total,
}: ComprasModalProps) {
  return (
    <StyledModalOverlay $visible={modalAberto} onClick={onFecharModal}>
      <StyledModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>{editandoId ? 'Editar Compra' : 'Nova Compra'}</StyledModalTitle>
          <StyledModalClose onClick={onFecharModal}>{'\u2715'}</StyledModalClose>
        </StyledModalHeader>

        <StyledForm>
          <StyledFormGroup>
            <StyledLabel>Local *</StyledLabel>
            <StyledFormRow>
              <StyledInput
                type="text"
                placeholder="Digite o local..."
                value={formData.local || ''}
                onChange={e => onAtualizarForm('local', e.target.value)}
              />
              <StyledFormSelect
                value=""
                onChange={e => {
                  const local = e.target.value;
                  if (local) onSelectLocal(local);
                  e.target.value = '';
                }}
              >
                <option value="">Selecionar local...</option>
                {locais.map((l: any) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </StyledFormSelect>
            </StyledFormRow>
          </StyledFormGroup>

          <StyledFormGroup>
            <StyledLabel>Status</StyledLabel>
            <StyledFormSelect
              value={formData.statusPagamento || 'pendente'}
              onChange={e => onAtualizarForm('statusPagamento', e.target.value)}
            >
              <option value="pendente">Pendente</option>
              <option value="pago">Pago</option>
            </StyledFormSelect>
          </StyledFormGroup>

          <StyledFormGroup>
            <StyledLabel>Adicionar Item</StyledLabel>
            <StyledFormRow>
              <StyledInput
                type="text"
                placeholder="Nome do produto..."
                value={itemNome}
                onChange={e => onSetItemNome(e.target.value)}
              />
              <StyledFormSelect
                onChange={e => {
                  const prod = produtos.find((p: any) => p.id === e.target.value);
                  if (prod) onSelectProduct(prod);
                  e.target.value = '';
                }}
              >
                <option value="">Selecionar produto...</option>
                {produtos.map((p: any) => (
                  <option key={p.id} value={p.id}>{p.nome} - R$ {Number(p.preco || 0).toFixed(2)}</option>
                ))}
              </StyledFormSelect>
            </StyledFormRow>
            <StyledFormRow>
              <StyledFormGroup>
                <StyledLabel>Qtd</StyledLabel>
                <StyledInput
                  type="number"
                  step="1"
                  min="1"
                  value={itemQtd}
                  onChange={e => onSetItemQtd(Number(e.target.value))}
                />
              </StyledFormGroup>
              <StyledFormGroup>
                <StyledLabel>Preco</StyledLabel>
                <StyledInput
                  type="number"
                  step="0.01"
                  min="0"
                  value={itemPreco}
                  onChange={e => onSetItemPreco(Number(e.target.value))}
                />
              </StyledFormGroup>
            </StyledFormRow>
            <StyledButton $variant="primary" onClick={() => onAddItem()}>Adicionar Item</StyledButton>
          </StyledFormGroup>

          <StyledFormGroup>
            <StyledLabel>Itens</StyledLabel>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {(formData.itens || []).map((i: any, idx: number) => (
                <li key={idx} style={{ padding: '4px 0' }}>
                  {i.nome} x{i.quantidade} - R$ {Number(i.precoUnitario || 0).toFixed(2)}{' '}
                  <StyledButton $variant="danger" onClick={() => onRemoveItem(idx)}>x</StyledButton>
                </li>
              ))}
            </ul>
            <div style={{ fontWeight: 700, marginTop: 8 }}>Total: R$ {total.toFixed(2)}</div>
          </StyledFormGroup>

          <StyledModalActions>
            <StyledButton $variant="secondary" onClick={onFecharModal}>
              Cancelar
            </StyledButton>
            <StyledButton $variant="primary" onClick={onSalvarCompra}>
              {editandoId ? 'Salvar Alteracoes' : 'Cadastrar Compra'}
            </StyledButton>
          </StyledModalActions>
        </StyledForm>
      </StyledModal>
    </StyledModalOverlay>
  );
}

