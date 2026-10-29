'use client';

import SidebarComp from '@/shared/sidebar/components/SidebarComp';
import HeaderComp from '@/shared/header/components/HeaderComp';
import ProdutosHeaderComp from '../../ProdutosHeader/components/ProdutosHeaderComp';
import ProdutosResumoComp from '../../ProdutosResumo/components/ProdutosResumoComp';
import ProdutosListComp from '../../ProdutosList/components/ProdutosListComp';
import ProdutosModalComp from '../../ProdutosModal/components/ProdutosModalComp';
import ProdutosConfirmComp from '../../ProdutosConfirm/components/ProdutosConfirmComp';
import { useProdutosMain } from '../utils/ProdutosMainUtils';
import {
  StyledProdutosLayout,
  StyledProdutosMainContent,
  StyledHamburgerButton,
  StyledOverlay,
  StyledProdutosContainer,
} from '../styles/ProdutosMainStyles';

export default function ProdutosMainComp() {
  const { state, actions, helpers } = useProdutosMain();

  return (
    <StyledProdutosLayout>
      <StyledHamburgerButton onClick={actions.toggleSidebar}>☰</StyledHamburgerButton>
      <StyledOverlay $visible={state.sidebarOpen} onClick={actions.closeSidebar} />
      <SidebarComp $isOpen={state.sidebarOpen} />
      <StyledProdutosMainContent>
        <HeaderComp />
        <StyledProdutosContainer>
          <ProdutosHeaderComp onAbrirModalNovo={actions.abrirModalNovo} />

          <ProdutosResumoComp
            resumo={state.data.resumo}
            formatarValor={helpers.formatarValor}
          />

          <ProdutosListComp
            produtosFiltrados={state.produtosFiltrados}
            filtros={state.filtros}
            data={state.data}
            formatarValor={helpers.formatarValor}
            formatarData={helpers.formatarData}
            onAtualizarFiltro={actions.atualizarFiltro}
            onLimparFiltros={actions.limparFiltros}
            onAbrirModalEditar={actions.abrirModalEditar}
            onConfirmarExclusao={actions.confirmarExclusao}
          />

          <ProdutosModalComp
            modalAberto={state.modalAberto}
            editandoId={state.editandoId}
            formData={state.formData}
            data={state.data}
            onFecharModal={actions.fecharModal}
            onAtualizarForm={actions.atualizarForm}
            onSalvarProduto={actions.salvarProduto}
          />

          <ProdutosConfirmComp
            exclusaoPendente={state.exclusaoPendente}
            onCancelar={actions.cancelarExclusao}
            onConfirmar={actions.confirmarEExcluir}
          />
        </StyledProdutosContainer>
      </StyledProdutosMainContent>
    </StyledProdutosLayout>
  );
}