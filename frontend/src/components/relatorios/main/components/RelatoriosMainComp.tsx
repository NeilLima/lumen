'use client';

import SidebarComp from '@/shared/sidebar/components/SidebarComp';
import HeaderComp from '@/shared/header/components/HeaderComp';
import RelatoriosHeaderComp from '../../RelatoriosHeader/components/RelatoriosHeaderComp';
import RelatoriosResumoComp from '../../RelatoriosResumo/components/RelatoriosResumoComp';
import RelatoriosListComp from '../../RelatoriosList/components/RelatoriosListComp';
import RelatoriosModalComp from '../../RelatoriosModal/components/RelatoriosModalComp';
import RelatoriosDetalheComp from '../../RelatoriosDetalhe/components/RelatoriosDetalheComp';
import RelatoriosConfirmComp from '../../RelatoriosConfirm/components/RelatoriosConfirmComp';
import RelatoriosInfoComp from '../../RelatoriosInfo/components/RelatoriosInfoComp';
import { useRelatoriosMain } from '../utils/RelatoriosMainUtils';
import {
  StyledRelatoriosLayout,
  StyledRelatoriosMainContent,
  StyledHamburgerButton,
  StyledOverlay,
  StyledRelatoriosContainer,
  StyledLoading,
} from '../styles/RelatoriosMainStyles';

export default function RelatoriosMainComp() {
  const { state, actions, helpers } = useRelatoriosMain();

  if (state.isLoading) {
    return (
      <StyledRelatoriosLayout>
        <StyledRelatoriosMainContent>
          <StyledRelatoriosContainer>
            <StyledLoading>Carregando relatórios...</StyledLoading>
          </StyledRelatoriosContainer>
        </StyledRelatoriosMainContent>
      </StyledRelatoriosLayout>
    );
  }

  if (!state.data) return null;

  return (
    <StyledRelatoriosLayout>
      <StyledHamburgerButton onClick={actions.toggleSidebar}>
        ☰
      </StyledHamburgerButton>
      <StyledOverlay $visible={state.sidebarOpen} onClick={actions.closeSidebar} />
      <SidebarComp $isOpen={state.sidebarOpen} />
      <StyledRelatoriosMainContent>
        <HeaderComp />
        <StyledRelatoriosContainer>
          <RelatoriosHeaderComp
            onAbrirInfo={actions.abrirInfo}
            onAbrirModalNovo={actions.abrirModalNovo}
          />

          <RelatoriosResumoComp
            resumo={state.data.resumo}
            formatarValor={helpers.formatarValor}
          />

          <RelatoriosListComp
            relatoriosFiltradas={state.relatoriosFiltradas} filtros={state.filtros} formatarValor={helpers.formatarValor} formatarData={helpers.formatarData} getStatusLabel={helpers.getStatusLabel} getStatusCor={helpers.getStatusCor} onAtualizarFiltro={actions.atualizarFiltro} onLimparFiltros={actions.limparFiltros} onAbrirDetalhe={actions.abrirDetalhe} onAbrirModalEditar={actions.abrirModalEditar} onConfirmarExclusao={actions.confirmarExclusao}
          />

          <RelatoriosModalComp
            modalAberto={state.modalAberto}
            editandoId={state.editandoId}
            formData={state.formData}
            onFecharModal={actions.fecharModal}
            onAtualizarForm={actions.atualizarForm}
            onSalvarRelatorio={actions.salvarRelatorio}
          />

          <RelatoriosDetalheComp
            detalheRelatorio={state.detalheRelatorio} formatarValor={helpers.formatarValor} formatarData={helpers.formatarData} getStatusLabel={helpers.getStatusLabel} getStatusCor={helpers.getStatusCor} onFecharDetalhe={actions.fecharDetalhe} onEditar={actions.handleEditarFromDetalhe}
          />

          <RelatoriosConfirmComp
            exclusaoPendente={state.exclusaoPendente}
            formatarValor={helpers.formatarValor}
            onCancelarExclusao={actions.cancelarExclusao}
            onConfirmarEExcluir={actions.confirmarEExcluir}
          />

          <RelatoriosInfoComp
            modalInfoAberto={state.modalInfoAberto}
            onFecharInfo={actions.fecharInfo}
          />
        </StyledRelatoriosContainer>
      </StyledRelatoriosMainContent>
    </StyledRelatoriosLayout>
  );
}
