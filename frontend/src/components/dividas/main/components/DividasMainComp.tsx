'use client';

import SidebarComp from '@/shared/sidebar/components/SidebarComp';
import HeaderComp from '@/shared/header/components/HeaderComp';
import DividasHeaderComp from '../../DividasHeader/components/DividasHeaderComp';
import DividasResumoComp from '../../DividasResumo/components/DividasResumoComp';
import DividasListComp from '../../DividasList/components/DividasListComp';
import DividasModalComp from '../../DividasModal/components/DividasModalComp';
import DividasDetalheComp from '../../DividasDetalhe/components/DividasDetalheComp';
import DividasConfirmComp from '../../DividasConfirm/components/DividasConfirmComp';
import DividasInfoComp from '../../DividasInfo/components/DividasInfoComp';
import { useDividasMain } from '../utils/DividasMainUtils';
import {
  StyledDividasLayout,
  StyledDividasMainContent,
  StyledHamburgerButton,
  StyledOverlay,
  StyledDividasContainer,
  StyledLoading,
} from '../styles/DividasMainStyles';

export default function DividasMainComp() {
  const { state, actions, helpers } = useDividasMain();

  if (state.isLoading) {
    return (
      <StyledDividasLayout>
        <StyledDividasMainContent>
          <StyledDividasContainer>
            <StyledLoading>Carregando dívidas...</StyledLoading>
          </StyledDividasContainer>
        </StyledDividasMainContent>
      </StyledDividasLayout>
    );
  }

  if (!state.data) return null;

  return (
    <StyledDividasLayout>
      <StyledHamburgerButton onClick={actions.toggleSidebar}>
        ☰
      </StyledHamburgerButton>
      <StyledOverlay $visible={state.sidebarOpen} onClick={actions.closeSidebar} />
      <SidebarComp $isOpen={state.sidebarOpen} />
      <StyledDividasMainContent>
        <HeaderComp />
        <StyledDividasContainer>
          <DividasHeaderComp
            onAbrirInfo={actions.abrirInfo}
            onAbrirModalNovo={actions.abrirModalNovo}
          />

          <DividasResumoComp
            resumo={state.data.resumo}
            formatarValor={helpers.formatarValor}
          />

          <DividasListComp
            dividasFiltradas={state.dividasFiltradas}
            filtros={state.filtros}
            formatarValor={helpers.formatarValor}
            formatarData={helpers.formatarData}
            getSituacaoLabel={helpers.getSituacaoLabel}
            getSituacaoCor={helpers.getSituacaoCor}
            getTipoLabel={helpers.getTipoLabel}
            calcularProgresso={helpers.calcularProgresso}
            onAtualizarFiltro={actions.atualizarFiltro}
            onLimparFiltros={actions.limparFiltros}
            onAbrirDetalhe={actions.abrirDetalhe}
            onAbrirModalEditar={actions.abrirModalEditar}
            onConfirmarExclusao={actions.confirmarExclusao}
          />

          <DividasModalComp
            modalAberto={state.modalAberto}
            editandoId={state.editandoId}
            formData={state.formData}
            onFecharModal={actions.fecharModal}
            onAtualizarForm={actions.atualizarForm}
            onSalvarDivida={actions.salvarDivida}
          />

          <DividasDetalheComp
            detalheDivida={state.detalheDivida}
            formatarValor={helpers.formatarValor}
            formatarData={helpers.formatarData}
            getSituacaoLabel={helpers.getSituacaoLabel}
            getSituacaoCor={helpers.getSituacaoCor}
            getTipoLabel={helpers.getTipoLabel}
            calcularProgresso={helpers.calcularProgresso}
            onFecharDetalhe={actions.fecharDetalhe}
            onEditar={actions.handleEditarFromDetalhe}
          />

          <DividasConfirmComp
            exclusaoPendente={state.exclusaoPendente}
            formatarValor={helpers.formatarValor}
            onCancelarExclusao={actions.cancelarExclusao}
            onConfirmarEExcluir={actions.confirmarEExcluir}
          />

          <DividasInfoComp
            modalInfoAberto={state.modalInfoAberto}
            onFecharInfo={actions.fecharInfo}
          />
        </StyledDividasContainer>
      </StyledDividasMainContent>
    </StyledDividasLayout>
  );
}