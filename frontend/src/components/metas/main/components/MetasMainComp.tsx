'use client';

import SidebarComp from '@/shared/sidebar/components/SidebarComp';
import HeaderComp from '@/shared/header/components/HeaderComp';
import MetasHeaderComp from '../../MetasHeader/components/MetasHeaderComp';
import MetasResumoComp from '../../MetasResumo/components/MetasResumoComp';
import MetasListComp from '../../MetasList/components/MetasListComp';
import MetasChartComp from '../../MetasChart/components/MetasChartComp';
import MetasModalComp from '../../MetasModal/components/MetasModalComp';
import MetasDetalheComp from '../../MetasDetalhe/components/MetasDetalheComp';
import MetasConfirmComp from '../../MetasConfirm/components/MetasConfirmComp';
import MetasInfoComp from '../../MetasInfo/components/MetasInfoComp';
import { useMetasMain } from '../utils/MetasMainUtils';
import {
  StyledMetasLayout, StyledMetasMainContent, StyledHamburgerButton,
  StyledOverlay, StyledMetasContainer, StyledLoading,
} from '../styles/MetasMainStyles';

export default function MetasMainComp() {
  const { state, actions, helpers } = useMetasMain();

  if (state.isLoading) {
    return (
      <StyledMetasLayout>
        <StyledMetasMainContent>
          <StyledMetasContainer>
            <StyledLoading>Carregando metas...</StyledLoading>
          </StyledMetasContainer>
        </StyledMetasMainContent>
      </StyledMetasLayout>
    );
  }

  if (!state.data) return null;

  return (
    <StyledMetasLayout>
      <StyledHamburgerButton onClick={actions.toggleSidebar}>☰</StyledHamburgerButton>
      <StyledOverlay $visible={state.sidebarOpen} onClick={actions.closeSidebar} />
      <SidebarComp $isOpen={state.sidebarOpen} />
      <StyledMetasMainContent>
        <HeaderComp />
        <StyledMetasContainer>
          <MetasHeaderComp onAbrirInfo={actions.abrirInfo} onAbrirModalNovo={actions.abrirModalNovo} />
          <MetasResumoComp resumo={state.data.resumo} formatarValor={helpers.formatarValor} />
          <MetasListComp
            metasFiltradas={state.metasFiltradas}
            filtros={state.filtros}
            data={state.data}
            formatarValor={helpers.formatarValor}
            formatarData={helpers.formatarData}
            getPrioridadeLabel={helpers.getPrioridadeLabel}
            getPrioridadeCor={helpers.getPrioridadeCor}
            getStatusLabel={helpers.getStatusLabel}
            getStatusCor={helpers.getStatusCor}
            calcularProgresso={helpers.calcularProgresso}
            onAtualizarFiltro={actions.atualizarFiltro}
            onLimparFiltros={actions.limparFiltros}
            onAbrirDetalhe={actions.abrirDetalhe}
            onAbrirModalEditar={actions.abrirModalEditar}
            onConfirmarExclusao={actions.confirmarExclusao}
          />
          <MetasChartComp data={state.data} formatarValor={helpers.formatarValor} />
          <MetasModalComp
            modalAberto={state.modalAberto}
            editandoId={state.editandoId}
            formData={state.formData}
            data={state.data}
            onFecharModal={actions.fecharModal}
            onAtualizarForm={actions.atualizarForm}
            onSalvarMeta={actions.salvarMeta}
          />
          <MetasDetalheComp
            detalheMeta={state.detalheMeta}
            formatarValor={helpers.formatarValor}
            formatarData={helpers.formatarData}
            getPrioridadeLabel={helpers.getPrioridadeLabel}
            getPrioridadeCor={helpers.getPrioridadeCor}
            getStatusLabel={helpers.getStatusLabel}
            getStatusCor={helpers.getStatusCor}
            calcularProgresso={helpers.calcularProgresso}
            onFecharDetalhe={actions.fecharDetalhe}
            onEditar={actions.handleEditarFromDetalhe}
          />
          <MetasConfirmComp
            exclusaoPendente={state.exclusaoPendente}
            formatarValor={helpers.formatarValor}
            onCancelarExclusao={actions.cancelarExclusao}
            onConfirmarEExcluir={actions.confirmarEExcluir}
          />
          <MetasInfoComp modalInfoAberto={state.modalInfoAberto} onFecharInfo={actions.fecharInfo} />
        </StyledMetasContainer>
      </StyledMetasMainContent>
    </StyledMetasLayout>
  );
}