'use client';

import SidebarComp from '@/shared/sidebar/components/SidebarComp';
import HeaderComp from '@/shared/header/components/HeaderComp';
import AssinaturasHeaderComp from '../../AssinaturasHeader/components/AssinaturasHeaderComp';
import AssinaturasResumoComp from '../../AssinaturasResumo/components/AssinaturasResumoComp';
import AssinaturasListComp from '../../AssinaturasList/components/AssinaturasListComp';
import AssinaturasModalComp from '../../AssinaturasModal/components/AssinaturasModalComp';
import AssinaturasDetalheComp from '../../AssinaturasDetalhe/components/AssinaturasDetalheComp';
import AssinaturasConfirmComp from '../../AssinaturasConfirm/components/AssinaturasConfirmComp';
import AssinaturasInfoComp from '../../AssinaturasInfo/components/AssinaturasInfoComp';
import { useAssinaturasMain } from '../utils/AssinaturasMainUtils';
import {
  StyledAssinaturasLayout,
  StyledAssinaturasMainContent,
  StyledHamburgerButton,
  StyledOverlay,
  StyledAssinaturasContainer,
  StyledLoading,
} from '../styles/AssinaturasMainStyles';

export default function AssinaturasMainComp() {
  const { state, actions, helpers } = useAssinaturasMain();

  if (state.isLoading) {
    return (
      <StyledAssinaturasLayout>
        <StyledAssinaturasMainContent>
          <StyledAssinaturasContainer>
            <StyledLoading>Carregando assinaturas...</StyledLoading>
          </StyledAssinaturasContainer>
        </StyledAssinaturasMainContent>
      </StyledAssinaturasLayout>
    );
  }

  if (!state.data) return null;

  return (
    <StyledAssinaturasLayout>
      <StyledHamburgerButton onClick={actions.toggleSidebar}>
        ☰
      </StyledHamburgerButton>
      <StyledOverlay $visible={state.sidebarOpen} onClick={actions.closeSidebar} />
      <SidebarComp $isOpen={state.sidebarOpen} />
      <StyledAssinaturasMainContent>
        <HeaderComp />
        <StyledAssinaturasContainer>
          <AssinaturasHeaderComp
            onAbrirInfo={actions.abrirInfo}
            onAbrirModalNovo={actions.abrirModalNovo}
          />

          <AssinaturasResumoComp
            resumo={state.data.resumo}
            formatarValor={helpers.formatarValor}
          />

          <AssinaturasListComp
            assinaturasFiltradas={state.assinaturasFiltradas} filtros={state.filtros} formatarValor={helpers.formatarValor} formatarData={helpers.formatarData} getStatusLabel={helpers.getStatusLabel} getStatusCor={helpers.getStatusCor} onAtualizarFiltro={actions.atualizarFiltro} onLimparFiltros={actions.limparFiltros} onAbrirDetalhe={actions.abrirDetalhe} onAbrirModalEditar={actions.abrirModalEditar} onConfirmarExclusao={actions.confirmarExclusao}
          />

          <AssinaturasModalComp
            modalAberto={state.modalAberto}
            editandoId={state.editandoId}
            formData={state.formData}
            onFecharModal={actions.fecharModal}
            onAtualizarForm={actions.atualizarForm}
            onSalvarAssinatura={actions.salvarAssinatura}
          />

          <AssinaturasDetalheComp
            detalheAssinatura={state.detalheAssinatura} formatarValor={helpers.formatarValor} formatarData={helpers.formatarData} getStatusLabel={helpers.getStatusLabel} getStatusCor={helpers.getStatusCor} onFecharDetalhe={actions.fecharDetalhe} onEditar={actions.handleEditarFromDetalhe}
          />

          <AssinaturasConfirmComp
            exclusaoPendente={state.exclusaoPendente}
            formatarValor={helpers.formatarValor}
            onCancelarExclusao={actions.cancelarExclusao}
            onConfirmarEExcluir={actions.confirmarEExcluir}
          />

          <AssinaturasInfoComp
            modalInfoAberto={state.modalInfoAberto}
            onFecharInfo={actions.fecharInfo}
          />
        </StyledAssinaturasContainer>
      </StyledAssinaturasMainContent>
    </StyledAssinaturasLayout>
  );
}
