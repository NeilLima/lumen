'use client';

import SidebarComp from '@/shared/sidebar/components/SidebarComp';
import HeaderComp from '@/shared/header/components/HeaderComp';
import AjudaHeaderComp from '../../AjudaHeader/components/AjudaHeaderComp';
import AjudaResumoComp from '../../AjudaResumo/components/AjudaResumoComp';
import AjudaListComp from '../../AjudaList/components/AjudaListComp';
import AjudaModalComp from '../../AjudaModal/components/AjudaModalComp';
import AjudaDetalheComp from '../../AjudaDetalhe/components/AjudaDetalheComp';
import AjudaConfirmComp from '../../AjudaConfirm/components/AjudaConfirmComp';
import AjudaInfoComp from '../../AjudaInfo/components/AjudaInfoComp';
import { useAjudaMain } from '../utils/AjudaMainUtils';
import {
  StyledAjudaLayout,
  StyledAjudaMainContent,
  StyledHamburgerButton,
  StyledOverlay,
  StyledAjudaContainer,
  StyledLoading,
} from '../styles/AjudaMainStyles';

export default function AjudaMainComp() {
  const { state, actions, helpers } = useAjudaMain();

  if (state.isLoading) {
    return (
      <StyledAjudaLayout>
        <StyledAjudaMainContent>
          <StyledAjudaContainer>
            <StyledLoading>Carregando artigos...</StyledLoading>
          </StyledAjudaContainer>
        </StyledAjudaMainContent>
      </StyledAjudaLayout>
    );
  }

  if (!state.data) return null;

  return (
    <StyledAjudaLayout>
      <StyledHamburgerButton onClick={actions.toggleSidebar}>
        ☰
      </StyledHamburgerButton>
      <StyledOverlay $visible={state.sidebarOpen} onClick={actions.closeSidebar} />
      <SidebarComp $isOpen={state.sidebarOpen} />
      <StyledAjudaMainContent>
        <HeaderComp />
        <StyledAjudaContainer>
          <AjudaHeaderComp
            onAbrirInfo={actions.abrirInfo}
            onAbrirModalNovo={actions.abrirModalNovo}
          />

          <AjudaResumoComp
            resumo={state.data.resumo}
            formatarValor={helpers.formatarValor}
          />

          <AjudaListComp
            ajudasFiltradas={state.ajudasFiltradas} filtros={state.filtros} formatarValor={helpers.formatarValor} formatarData={helpers.formatarData} getStatusLabel={helpers.getStatusLabel} getStatusCor={helpers.getStatusCor} onAtualizarFiltro={actions.atualizarFiltro} onLimparFiltros={actions.limparFiltros} onAbrirDetalhe={actions.abrirDetalhe} onAbrirModalEditar={actions.abrirModalEditar} onConfirmarExclusao={actions.confirmarExclusao}
          />

          <AjudaModalComp
            modalAberto={state.modalAberto}
            editandoId={state.editandoId}
            formData={state.formData}
            onFecharModal={actions.fecharModal}
            onAtualizarForm={actions.atualizarForm}
            onSalvarAjuda={actions.salvarAjuda}
          />

          <AjudaDetalheComp
            detalheAjuda={state.detalheAjuda} formatarValor={helpers.formatarValor} formatarData={helpers.formatarData} getStatusLabel={helpers.getStatusLabel} getStatusCor={helpers.getStatusCor} onFecharDetalhe={actions.fecharDetalhe} onEditar={actions.handleEditarFromDetalhe}
          />

          <AjudaConfirmComp
            exclusaoPendente={state.exclusaoPendente}
            formatarValor={helpers.formatarValor}
            onCancelarExclusao={actions.cancelarExclusao}
            onConfirmarEExcluir={actions.confirmarEExcluir}
          />

          <AjudaInfoComp
            modalInfoAberto={state.modalInfoAberto}
            onFecharInfo={actions.fecharInfo}
          />
        </StyledAjudaContainer>
      </StyledAjudaMainContent>
    </StyledAjudaLayout>
  );
}
