'use client';

import { useEffect, useMemo, useState } from 'react';
import type { EstoqueFormData, EstoqueCompraItemOption } from '../../main/types/EstoqueTypes';
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
  StyledBuscaWrap,
  StyledBuscaInput,
  StyledBuscaDropdown,
  StyledBuscaOption,
  StyledBuscaOptionNome,
  StyledBuscaOptionMeta,
  StyledBuscaEmpty,
  StyledBuscaLimpar,
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

  const [buscaCompra, setBuscaCompra] = useState('');
  const [buscaAberta, setBuscaAberta] = useState(false);

  useEffect(() => {
    if (modalAberto) {
      setBuscaCompra('');
      setBuscaAberta(false);
    }
  }, [modalAberto]);

  const itemSelecionado = useMemo(
    () => itensCompra.find(i => i.id === formData.compraItemId) || null,
    [itensCompra, formData.compraItemId]
  );

  const itensCompraFiltrados = useMemo(() => {
    const termo = buscaCompra.trim().toLowerCase();
    if (!termo) return itensCompra;
    return itensCompra.filter(item =>
      [item.nome, item.categoria, item.localCompra]
        .filter(Boolean)
        .some(campo => campo.toLowerCase().includes(termo))
    );
  }, [itensCompra, buscaCompra]);

  const nomeExibicao = (item: EstoqueCompraItemOption) => item.nome?.trim() || 'Item sem nome';

  const selecionarItem = (item: EstoqueCompraItemOption) => {
    onSelecionarCompraItem(item.id);
    setBuscaCompra('');
    setBuscaAberta(false);
  };

  const limparSelecao = () => {
    onSelecionarCompraItem('');
    setBuscaCompra('');
    setBuscaAberta(false);
  };

  const metaItem = (item: EstoqueCompraItemOption) =>
    [
      item.categoria || null,
      `${item.quantidade} ${item.unidade}`,
      `R$ ${formatarValor(item.preco)}`,
      item.localCompra || null,
    ]
      .filter(Boolean)
      .join(' • ');

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
            <StyledBuscaWrap>
              <StyledBuscaInput
                type="text"
                placeholder="Buscar item comprado pelo nome..."
                value={buscaAberta ? buscaCompra : itemSelecionado ? nomeExibicao(itemSelecionado) : buscaCompra}
                onChange={e => {
                  setBuscaCompra(e.target.value);
                  setBuscaAberta(true);
                }}
                onFocus={() => setBuscaAberta(true)}
                onBlur={() => setBuscaAberta(false)}
                data-testid="estoque-compra-item-select"
              />
              {itemSelecionado && !buscaAberta && (
                <StyledBuscaLimpar onClick={limparSelecao} title="Limpar seleção" data-testid="estoque-compra-item-limpar">
                  ✕
                </StyledBuscaLimpar>
              )}
              {buscaAberta && (
                <StyledBuscaDropdown>
                  {formData.compraItemId && (
                    <StyledBuscaOption type="button" onMouseDown={limparSelecao} data-testid="estoque-compra-item-limpar-opcao">
                      <StyledBuscaOptionMeta>— Nenhum (preencher manualmente) —</StyledBuscaOptionMeta>
                    </StyledBuscaOption>
                  )}
                  {itensCompraFiltrados.length === 0 && (
                    <StyledBuscaEmpty>
                      {itensCompra.length === 0
                        ? 'Nenhum item de compra encontrado. Cadastre uma compra primeiro.'
                        : 'Nenhum item encontrado para essa busca.'}
                    </StyledBuscaEmpty>
                  )}
                  {itensCompraFiltrados.map(item => (
                    <StyledBuscaOption
                      key={item.id}
                      type="button"
                      onMouseDown={() => selecionarItem(item)}
                      data-testid={`estoque-compra-item-opcao-${item.id}`}
                    >
                      <StyledBuscaOptionNome>{nomeExibicao(item)}</StyledBuscaOptionNome>
                      <StyledBuscaOptionMeta>{metaItem(item)}</StyledBuscaOptionMeta>
                    </StyledBuscaOption>
                  ))}
                </StyledBuscaDropdown>
              )}
            </StyledBuscaWrap>
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
