'use client';

import SidebarComp from '@/shared/sidebar/components/SidebarComp';
import HeaderComp from '@/shared/header/components/HeaderComp';
import NotificacoesHeaderComp from '../../NotificacoesHeader/components/NotificacoesHeaderComp';
import NotificacoesListComp from '../../NotificacoesList/components/NotificacoesListComp';
import NotificacoesModalComp from '../../NotificacoesModal/components/NotificacoesModalComp';
import NotificacoesDetalheComp from '../../NotificacoesDetalhe/components/NotificacoesDetalheComp';
import NotificacoesConfirmComp from '../../NotificacoesConfirm/components/NotificacoesConfirmComp';
import NotificacoesInfoComp from '../../NotificacoesInfo/components/NotificacoesInfoComp';
import { useNotificacoesMain } from '../utils/NotificacoesMainUtils';
import {
  StyledNotificacoesLayout,
  StyledNotificacoesMainContent,
  StyledHamburgerButton,
  StyledOverlay,
  StyledNotificacoesContainer,
  StyledLoading,
} from '../styles/NotificacoesMainStyles';

export default function NotificacoesMainComp() {
  const { state, actions, helpers } = useNotificacoesMain();

  if (state.isLoading) {
    return (
      <StyledNotificacoesLayout>
        <StyledNotificacoesMainContent>
          <StyledNotificacoesContainer>
            <StyledLoading>Carregando notificações...</StyledLoading>
          </StyledNotificacoesContainer>
        </StyledNotificacoesMainContent>
      </StyledNotificacoesLayout>
    );
  }

  if (!state.data) return null;

  return (
    <StyledNotificacoesLayout>
      <StyledHamburgerButton onClick={actions.toggleSidebar}>
        ☰
      </StyledHamburgerButton>
      <StyledOverlay $visible={state.sidebarOpen} onClick={actions.closeSidebar} />
      <SidebarComp $isOpen={state.sidebarOpen} />
      <StyledNotificacoesMainContent>
        <HeaderComp />
        <StyledNotificacoesContainer>
          <NotificacoesHeaderComp
            onAbrirInfo={actions.abrirInfo}
            onAbrirModalNovo={actions.abrirModalNovo}
          />

          <NotificacoesListComp
            notificacoesFiltradas={state.notificacoesFiltradas} filtros={state.filtros} formatarValor={helpers.formatarValor} formatarData={helpers.formatarData} getStatusLabel={helpers.getStatusLabel} getStatusCor={helpers.getStatusCor} onAtualizarFiltro={actions.atualizarFiltro} onLimparFiltros={actions.limparFiltros} onAbrirDetalhe={actions.abrirDetalhe} onAbrirModalEditar={actions.abrirModalEditar} onConfirmarExclusao={actions.confirmarExclusao}
          />

          <NotificacoesModalComp
            modalAberto={state.modalAberto}
            editandoId={state.editandoId}
            formData={state.formData}
            onFecharModal={actions.fecharModal}
            onAtualizarForm={actions.atualizarForm}
            onSalvarNotificacao={actions.salvarNotificacao}
          />

          <NotificacoesDetalheComp
            detalheNotificacao={state.detalheNotificacao} formatarValor={helpers.formatarValor} formatarData={helpers.formatarData} getStatusLabel={helpers.getStatusLabel} getStatusCor={helpers.getStatusCor} onFecharDetalhe={actions.fecharDetalhe} onEditar={actions.handleEditarFromDetalhe}
          />

          <NotificacoesConfirmComp
            exclusaoPendente={state.exclusaoPendente}
            formatarValor={helpers.formatarValor}
            onCancelarExclusao={actions.cancelarExclusao}
            onConfirmarEExcluir={actions.confirmarEExcluir}
          />

          <NotificacoesInfoComp
            modalInfoAberto={state.modalInfoAberto}
            onFecharInfo={actions.fecharInfo}
          />
        </StyledNotificacoesContainer>
      </StyledNotificacoesMainContent>
    </StyledNotificacoesLayout>
  );
}
