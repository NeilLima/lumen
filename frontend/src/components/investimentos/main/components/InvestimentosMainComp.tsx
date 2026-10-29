'use client';

import SidebarComp from '@/shared/sidebar/components/SidebarComp';
import HeaderComp from '@/shared/header/components/HeaderComp';
import InvestimentosHeaderComp from '../../InvestimentosHeader/components/InvestimentosHeaderComp';
import InvestimentosResumoComp from '../../InvestimentosResumo/components/InvestimentosResumoComp';
import InvestimentosListComp from '../../InvestimentosList/components/InvestimentosListComp';
import InvestimentosModalComp from '../../InvestimentosModal/components/InvestimentosModalComp';
import InvestimentosDetalheComp from '../../InvestimentosDetalhe/components/InvestimentosDetalheComp';
import InvestimentosConfirmComp from '../../InvestimentosConfirm/components/InvestimentosConfirmComp';
import InvestimentosInfoComp from '../../InvestimentosInfo/components/InvestimentosInfoComp';
import { useInvestimentosMain } from '../utils/InvestimentosMainUtils';
import {
  StyledInvestimentosLayout,
  StyledInvestimentosMainContent,
  StyledHamburgerButton,
  StyledOverlay,
  StyledInvestimentosContainer,
  StyledLoading,
} from '../styles/InvestimentosMainStyles';

export default function InvestimentosMainComp() {
  const { state, actions, helpers } = useInvestimentosMain();

  if (state.isLoading) {
    return (
      <StyledInvestimentosLayout>
        <StyledInvestimentosMainContent>
          <StyledInvestimentosContainer>
            <StyledLoading>Carregando investimentos...</StyledLoading>
          </StyledInvestimentosContainer>
        </StyledInvestimentosMainContent>
      </StyledInvestimentosLayout>
    );
  }

  if (!state.data) return null;

  return (
    <StyledInvestimentosLayout>
      <StyledHamburgerButton onClick={actions.toggleSidebar}>
        ☰
      </StyledHamburgerButton>
      <StyledOverlay $visible={state.sidebarOpen} onClick={actions.closeSidebar} />
      <SidebarComp $isOpen={state.sidebarOpen} />
      <StyledInvestimentosMainContent>
        <HeaderComp />
        <StyledInvestimentosContainer>
          <InvestimentosHeaderComp
            onAbrirInfo={actions.abrirInfo}
            onAbrirModalNovo={actions.abrirModalNovo}
          />

          <InvestimentosResumoComp
            resumo={state.data.resumo}
            formatarValor={helpers.formatarValor}
          />

          <InvestimentosListComp
            investimentosFiltradas={state.investimentosFiltradas} filtros={state.filtros} formatarValor={helpers.formatarValor} formatarData={helpers.formatarData} getStatusLabel={helpers.getStatusLabel} getStatusCor={helpers.getStatusCor} onAtualizarFiltro={actions.atualizarFiltro} onLimparFiltros={actions.limparFiltros} onAbrirDetalhe={actions.abrirDetalhe} onAbrirModalEditar={actions.abrirModalEditar} onConfirmarExclusao={actions.confirmarExclusao}
          />

          <InvestimentosModalComp
            modalAberto={state.modalAberto}
            editandoId={state.editandoId}
            formData={state.formData}
            onFecharModal={actions.fecharModal}
            onAtualizarForm={actions.atualizarForm}
            onSalvarInvestimento={actions.salvarInvestimento}
          />

          <InvestimentosDetalheComp
            detalheInvestimento={state.detalheInvestimento} formatarValor={helpers.formatarValor} formatarData={helpers.formatarData} getStatusLabel={helpers.getStatusLabel} getStatusCor={helpers.getStatusCor} onFecharDetalhe={actions.fecharDetalhe} onEditar={actions.handleEditarFromDetalhe}
          />

          <InvestimentosConfirmComp
            exclusaoPendente={state.exclusaoPendente}
            formatarValor={helpers.formatarValor}
            onCancelarExclusao={actions.cancelarExclusao}
            onConfirmarEExcluir={actions.confirmarEExcluir}
          />

          <InvestimentosInfoComp
            modalInfoAberto={state.modalInfoAberto}
            onFecharInfo={actions.fecharInfo}
          />
        </StyledInvestimentosContainer>
      </StyledInvestimentosMainContent>
    </StyledInvestimentosLayout>
  );
}
