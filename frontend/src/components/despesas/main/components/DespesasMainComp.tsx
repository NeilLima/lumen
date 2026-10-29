'use client';

import SidebarComp from '@/shared/sidebar/components/SidebarComp';
import HeaderComp from '@/shared/header/components/HeaderComp';
import DespesasHeaderComp from '../../DespesasHeader/components/DespesasHeaderComp';
import DespesasResumoComp from '../../DespesasResumo/components/DespesasResumoComp';
import DespesasListComp from '../../DespesasList/components/DespesasListComp';
import DespesasModalComp from '../../DespesasModal/components/DespesasModalComp';
import DespesasDetalheComp from '../../DespesasDetalhe/components/DespesasDetalheComp';
import DespesasConfirmComp from '../../DespesasConfirm/components/DespesasConfirmComp';
import DespesasInfoComp from '../../DespesasInfo/components/DespesasInfoComp';
import { useDespesasMain } from '../utils/DespesasMainUtils';
import {
  StyledDespesasLayout,
  StyledDespesasMainContent,
  StyledHamburgerButton,
  StyledOverlay,
  StyledDespesasContainer,
  StyledLoading,
} from '../styles/DespesasMainStyles';

export default function DespesasMainComp() {
  const { state, actions, helpers } = useDespesasMain();

  if (state.isLoading) {
    return (
      <StyledDespesasLayout>
        <StyledDespesasMainContent>
          <StyledDespesasContainer>
            <StyledLoading>Carregando despesas...</StyledLoading>
          </StyledDespesasContainer>
        </StyledDespesasMainContent>
      </StyledDespesasLayout>
    );
  }

  if (!state.data) return null;

  return (
    <StyledDespesasLayout>
      <StyledHamburgerButton onClick={actions.toggleSidebar}>
        ☰
      </StyledHamburgerButton>
      <StyledOverlay $visible={state.sidebarOpen} onClick={actions.closeSidebar} />
      <SidebarComp $isOpen={state.sidebarOpen} />
      <StyledDespesasMainContent>
        <HeaderComp />
        <StyledDespesasContainer>
          <DespesasHeaderComp
            onAbrirInfo={actions.abrirInfo}
            onAbrirModalNovo={actions.abrirModalNovo}
          />

          <DespesasResumoComp
            resumo={state.data.resumo}
            formatarValor={helpers.formatarValor}
          />

          <DespesasListComp
            despesasFiltradas={state.despesasFiltradas}
            filtros={state.filtros}
            data={state.data}
            formatarValor={helpers.formatarValor}
            formatarData={helpers.formatarData}
            getStatusCor={helpers.getStatusCor}
            getStatusLabel={helpers.getStatusLabel}
            getPrioridadeCor={helpers.getPrioridadeCor}
            getPrioridadeLabel={helpers.getPrioridadeLabel}
            onAtualizarFiltro={actions.atualizarFiltro}
            onLimparFiltros={actions.limparFiltros}
            onAbrirDetalhe={actions.abrirDetalhe}
            onAbrirModalEditar={actions.abrirModalEditar}
            onConfirmarExclusao={actions.confirmarExclusao}
          />

          <DespesasModalComp
            modalAberto={state.modalAberto}
            editandoId={state.editandoId}
            formData={state.formData}
            data={state.data}
            onFecharModal={actions.fecharModal}
            onAtualizarForm={actions.atualizarForm}
            onSalvarDespesa={actions.salvarDespesa}
          />

          <DespesasDetalheComp
            detalheDespesa={state.detalheDespesa}
            formatarValor={helpers.formatarValor}
            formatarData={helpers.formatarData}
            getStatusCor={helpers.getStatusCor}
            getStatusLabel={helpers.getStatusLabel}
            getPrioridadeCor={helpers.getPrioridadeCor}
            getPrioridadeLabel={helpers.getPrioridadeLabel}
            onFecharDetalhe={actions.fecharDetalhe}
            onEditar={actions.handleEditarFromDetalhe}
          />

          <DespesasConfirmComp
            exclusaoPendente={state.exclusaoPendente}
            formatarValor={helpers.formatarValor}
            onCancelarExclusao={actions.cancelarExclusao}
            onConfirmarEExcluir={actions.confirmarEExcluir}
          />

          <DespesasInfoComp
            modalInfoAberto={state.modalInfoAberto}
            onFecharInfo={actions.fecharInfo}
          />
        </StyledDespesasContainer>
      </StyledDespesasMainContent>
    </StyledDespesasLayout>
  );
}