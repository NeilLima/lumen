'use client';

import SidebarComp from '@/shared/sidebar/components/SidebarComp';
import HeaderComp from '@/shared/header/components/HeaderComp';
import ComprasHeaderComp from '../../ComprasHeader/components/ComprasHeaderComp';
import ComprasResumoComp from '../../ComprasResumo/components/ComprasResumoComp';
import ComprasListComp from '../../ComprasList/components/ComprasListComp';
import ComprasModalComp from '../../ComprasModal/components/ComprasModalComp';
import ComprasDetalheComp from '../../ComprasDetalhe/components/ComprasDetalheComp';
import ComprasConfirmComp from '../../ComprasConfirm/components/ComprasConfirmComp';
import ComprasInfoComp from '../../ComprasInfo/components/ComprasInfoComp';
import { useComprasMain } from '../utils/ComprasMainUtils';
import {
  StyledComprasLayout,
  StyledComprasMainContent,
  StyledHamburgerButton,
  StyledOverlay,
  StyledComprasContainer,
  StyledLoading,
} from '../styles/ComprasMainStyles';

export default function ComprasMainComp() {
  const { state, actions, helpers } = useComprasMain();

  if (state.isLoading) {
    return (
      <StyledComprasLayout>
        <StyledComprasMainContent>
          <StyledComprasContainer>
            <StyledLoading>Carregando compras...</StyledLoading>
          </StyledComprasContainer>
        </StyledComprasMainContent>
      </StyledComprasLayout>
    );
  }

  if (!state.data) return null;

  return (
    <StyledComprasLayout>
      <StyledHamburgerButton onClick={actions.toggleSidebar}>
        {'\u2630'}
      </StyledHamburgerButton>
      <StyledOverlay $visible={state.sidebarOpen} onClick={actions.closeSidebar} />
      <SidebarComp $isOpen={state.sidebarOpen} />
      <StyledComprasMainContent>
        <HeaderComp />
        <StyledComprasContainer>
          <ComprasHeaderComp
            onAbrirInfo={actions.abrirInfo}
            onAbrirModalNovo={actions.abrirModalNovo}
          />

          <ComprasResumoComp
            resumo={state.data.resumo}
            formatarValor={helpers.formatarValor}
          />

          <ComprasListComp
            comprasFiltradas={state.comprasFiltradas}
            filtros={state.filtros}
            data={state.data}
            formatarValor={helpers.formatarValor}
            formatarData={helpers.formatarData}
            getStatusCor={helpers.getStatusCor}
            getStatusLabel={helpers.getStatusLabel}
            onAtualizarFiltro={actions.atualizarFiltro}
            onLimparFiltros={actions.limparFiltros}
            onAbrirDetalhe={actions.abrirDetalhe}
            onAbrirModalEditar={actions.abrirModalEditar}
            onConfirmarExclusao={actions.confirmarExclusao}
          />

          <ComprasModalComp
            modalAberto={state.modalAberto}
            editandoId={state.editandoId}
            formData={state.formData}
            data={state.data}
            itemNome={state.itemNome}
            itemQtd={state.itemQtd}
            itemPreco={state.itemPreco}
            showProductSelector={state.showProductSelector}
            showLocalSelector={state.showLocalSelector}
            onFecharModal={actions.fecharModal}
            onAtualizarForm={actions.atualizarForm}
            onSalvarCompra={actions.salvarCompra}
            onAddItem={actions.addItem}
            onRemoveItem={actions.removeItem}
            onSetItemNome={actions.setItemNome}
            onSetItemQtd={actions.setItemQtd}
            onSetItemPreco={actions.setItemPreco}
            onSetShowProductSelector={actions.setShowProductSelector}
            onSetShowLocalSelector={actions.setShowLocalSelector}
            onSelectProduct={(p: any) => { 
  actions.setItemNome(p.nome || ''); 
  actions.setItemPreco(Number(p.preco || 0)); 
  // Não mais esconder o seletor - deixo aberto para o usuário confirmar o produto
  // actions.setShowProductSelector(false); 
}}
            onSelectLocal={(local: string) => { actions.atualizarForm('local', local); actions.setShowLocalSelector(false); }}
            produtos={state.produtos}
            locais={state.locais}
            contas={state.contas}
            total={state.formData.itens.reduce((a: number, i: any) => a + i.quantidade * i.precoUnitario, 0)}
          />

          <ComprasDetalheComp
            detalheCompra={state.detalheCompra}
            formatarValor={helpers.formatarValor}
            formatarData={helpers.formatarData}
            getStatusCor={helpers.getStatusCor}
            getStatusLabel={helpers.getStatusLabel}
            onFecharDetalhe={actions.fecharDetalhe}
            onEditar={actions.handleEditarFromDetalhe}
          />

          <ComprasConfirmComp
            exclusaoPendente={state.exclusaoPendente}
            formatarValor={helpers.formatarValor}
            onCancelarExclusao={actions.cancelarExclusao}
            onConfirmarEExcluir={actions.confirmarEExcluir}
          />

          <ComprasInfoComp
            modalInfoAberto={state.modalInfoAberto}
            onFecharInfo={actions.fecharInfo}
          />
        </StyledComprasContainer>
      </StyledComprasMainContent>
    </StyledComprasLayout>
  );
}

