'use client';

import SidebarComp from '@/shared/sidebar/components/SidebarComp';
import HeaderComp from '@/shared/header/components/HeaderComp';
import ConfiguracoesHeaderComp from '../../ConfiguracoesHeader/components/ConfiguracoesHeaderComp';
import ConfiguracoesResumoComp from '../../ConfiguracoesResumo/components/ConfiguracoesResumoComp';
import ConfiguracoesListComp from '../../ConfiguracoesList/components/ConfiguracoesListComp';
import ConfiguracoesModalComp from '../../ConfiguracoesModal/components/ConfiguracoesModalComp';
import ConfiguracoesDetalheComp from '../../ConfiguracoesDetalhe/components/ConfiguracoesDetalheComp';
import ConfiguracoesConfirmComp from '../../ConfiguracoesConfirm/components/ConfiguracoesConfirmComp';
import ConfiguracoesInfoComp from '../../ConfiguracoesInfo/components/ConfiguracoesInfoComp';
import { useConfiguracoesMain } from '../utils/ConfiguracoesMainUtils';
import {
  StyledConfiguracoesLayout,
  StyledConfiguracoesMainContent,
  StyledHamburgerButton,
  StyledOverlay,
  StyledConfiguracoesContainer,
  StyledLoading,
} from '../styles/ConfiguracoesMainStyles';

export default function ConfiguracoesMainComp() {
  const { state, actions, helpers } = useConfiguracoesMain();

  if (state.isLoading) {
    return (
      <StyledConfiguracoesLayout>
        <StyledConfiguracoesMainContent>
          <StyledConfiguracoesContainer>
            <StyledLoading>Carregando configurações...</StyledLoading>
          </StyledConfiguracoesContainer>
        </StyledConfiguracoesMainContent>
      </StyledConfiguracoesLayout>
    );
  }

  if (!state.data) return null;

  return (
    <StyledConfiguracoesLayout>
      <StyledHamburgerButton onClick={actions.toggleSidebar}>
        ☰
      </StyledHamburgerButton>
      <StyledOverlay $visible={state.sidebarOpen} onClick={actions.closeSidebar} />
      <SidebarComp $isOpen={state.sidebarOpen} />
      <StyledConfiguracoesMainContent>
        <HeaderComp />
        <StyledConfiguracoesContainer>
          <ConfiguracoesHeaderComp
            onAbrirInfo={actions.abrirInfo}
            onAbrirModalNovo={actions.abrirModalNovo}
          />

          <ConfiguracoesResumoComp
            resumo={state.data.resumo}
            formatarValor={helpers.formatarValor}
          />

          <ConfiguracoesListComp
            configuracoesFiltradas={state.configuracoesFiltradas}
            filtros={state.filtros}
            formatarValor={helpers.formatarValor}
            formatarData={helpers.formatarData}
            getStatusLabel={helpers.getStatusLabel}
            getStatusCor={helpers.getStatusCor}
            onAtualizarFiltro={actions.atualizarFiltro}
            onLimparFiltros={actions.limparFiltros}
            onAbrirDetalhe={actions.abrirDetalhe}
            onAbrirModalEditar={actions.abrirModalEditar}
            onConfirmarExclusao={actions.confirmarExclusao}
          />

          <ConfiguracoesModalComp
            modalAberto={state.modalAberto}
            editandoId={state.editandoId}
            formData={state.formData}
            onFecharModal={actions.fecharModal}
            onAtualizarForm={actions.atualizarForm}
            onSalvarConfiguracao={actions.salvarConfiguracao}
          />

          <ConfiguracoesDetalheComp
            detalheConfiguracao={state.detalheConfiguracao} formatarValor={helpers.formatarValor} formatarData={helpers.formatarData} getStatusLabel={helpers.getStatusLabel} getStatusCor={helpers.getStatusCor} onFecharDetalhe={actions.fecharDetalhe} onEditar={actions.handleEditarFromDetalhe}
          />

          <ConfiguracoesConfirmComp
            exclusaoPendente={state.exclusaoPendente}
            formatarValor={helpers.formatarValor}
            onCancelarExclusao={actions.cancelarExclusao}
            onConfirmarEExcluir={actions.confirmarEExcluir}
          />

          <ConfiguracoesInfoComp
            modalInfoAberto={state.modalInfoAberto}
            onFecharInfo={actions.fecharInfo}
          />
        </StyledConfiguracoesContainer>
      </StyledConfiguracoesMainContent>
    </StyledConfiguracoesLayout>
  );
}
