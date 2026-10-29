'use client';

import type { ProdutosFormData } from '../../main/utils/ProdutosMainUtils';
import { formatarValor, parseMoeda } from '@/shared/utils/moeda';
import {
  StyledProdutosModalOverlay,
  StyledProdutosModal,
  StyledProdutosModalHeader,
  StyledProdutosModalTitle,
  StyledProdutosModalClose,
  StyledProdutosForm,
  StyledProdutosFormGroup,
  StyledProdutosFormRow,
  StyledProdutosLabel,
  StyledProdutosInput,
  StyledProdutosFormSelect,
  StyledProdutosModalActions,
  StyledProdutosBtn,
  StyledPreviewValor,
  StyledPreviewValorStrong,
} from '../styles/ProdutosModalStyles';

interface ProdutosModalProps {
  modalAberto: boolean;
  editandoId: string | null;
  formData: ProdutosFormData;
  data: { categorias: string[]; locais: string[] };
  onFecharModal: () => void;
  onAtualizarForm: (campo: keyof ProdutosFormData, valor: string) => void;
  onSalvarProduto: () => void;
}

export default function ProdutosModalComp({
  modalAberto,
  editandoId,
  formData,
  data,
  onFecharModal,
  onAtualizarForm,
  onSalvarProduto,
}: ProdutosModalProps) {
  const preco = parseMoeda(formData.preco);
  const parcelas = Math.max(1, Number(formData.parcelas) || 1);
  const valorParcela = preco / parcelas;

  return (
    <StyledProdutosModalOverlay $visible={modalAberto} onClick={onFecharModal}>
      <StyledProdutosModal onClick={e => e.stopPropagation()}>
        <StyledProdutosModalHeader>
          <StyledProdutosModalTitle>
            {editandoId ? 'Editar Produto' : 'Novo Produto'}
          </StyledProdutosModalTitle>
          <StyledProdutosModalClose onClick={onFecharModal}>✕</StyledProdutosModalClose>
        </StyledProdutosModalHeader>

        <StyledProdutosForm>
          <StyledProdutosFormGroup>
            <StyledProdutosLabel>Nome do produto *</StyledProdutosLabel>
            <StyledProdutosInput
              type="text"
              placeholder="Ex: Arroz 5kg, Cafeteira, Sabão..."
              value={formData.nome}
              onChange={e => onAtualizarForm('nome', e.target.value)}
            />
          </StyledProdutosFormGroup>

          <StyledProdutosFormRow>
            <StyledProdutosFormGroup>
              <StyledProdutosLabel>Categoria *</StyledProdutosLabel>
              <StyledProdutosFormSelect
                value={formData.categoria}
                onChange={e => onAtualizarForm('categoria', e.target.value)}
              >
                <option value="">Selecione...</option>
                {data.categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </StyledProdutosFormSelect>
            </StyledProdutosFormGroup>

            <StyledProdutosFormGroup>
              <StyledProdutosLabel>Onde foi comprado? *</StyledProdutosLabel>
              <StyledProdutosFormSelect
                value={formData.localCompra}
                onChange={e => onAtualizarForm('localCompra', e.target.value)}
              >
                <option value="">Selecione o local...</option>
                {data.locais.map(local => (
                  <option key={local} value={local}>{local}</option>
                ))}
                <option value="__novo__">➕ Digitar novo local...</option>
              </StyledProdutosFormSelect>
            </StyledProdutosFormGroup>
          </StyledProdutosFormRow>

          {formData.localCompra === '__novo__' && (
            <StyledProdutosFormGroup>
              <StyledProdutosLabel>Novo local de compra *</StyledProdutosLabel>
              <StyledProdutosInput
                type="text"
                placeholder="Ex: Mercado do Bairro, Amazon..."
                value={formData.novoLocal}
                onChange={e => onAtualizarForm('novoLocal', e.target.value)}
              />
            </StyledProdutosFormGroup>
          )}

          <StyledProdutosFormRow>
            <StyledProdutosFormGroup>
              <StyledProdutosLabel>Preço (R$) *</StyledProdutosLabel>
              <StyledProdutosInput
                type="text"
                inputMode="numeric"
                placeholder="R$ 0,00"
                value={formData.preco}
                onChange={e => {
                  const digitos = e.target.value.replace(/\D/g, '');
                  onAtualizarForm(
                    'preco',
                    digitos ? formatarValor(parseInt(digitos, 10) / 100) : ''
                  );
                }}
              />
            </StyledProdutosFormGroup>

            <StyledProdutosFormGroup>
              <StyledProdutosLabel>Parcelas</StyledProdutosLabel>
              <StyledProdutosInput
                type="number"
                min="1"
                max="48"
                placeholder="1"
                value={formData.parcelas}
                onChange={e => onAtualizarForm('parcelas', e.target.value)}
              />
            </StyledProdutosFormGroup>
          </StyledProdutosFormRow>

          <StyledPreviewValor>
            <span>
              {parcelas > 1
                ? `${parcelas}x de R$ ${formatarValor(valorParcela)}`
                : 'À vista (sem parcelamento)'}
            </span>
            <StyledPreviewValorStrong>Total: R$ {formatarValor(preco)}</StyledPreviewValorStrong>
          </StyledPreviewValor>

          <StyledProdutosModalActions>
            <StyledProdutosBtn $variant="secondary" onClick={onFecharModal}>
              Cancelar
            </StyledProdutosBtn>
            <StyledProdutosBtn $variant="primary" onClick={onSalvarProduto}>
              {editandoId ? 'Salvar Alterações' : 'Cadastrar Produto'}
            </StyledProdutosBtn>
          </StyledProdutosModalActions>
        </StyledProdutosForm>
      </StyledProdutosModal>
    </StyledProdutosModalOverlay>
  );
}
