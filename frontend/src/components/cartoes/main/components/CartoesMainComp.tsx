'use client';

import SidebarComp from '@/shared/sidebar/components/SidebarComp';
import HeaderComp from '@/shared/header/components/HeaderComp';
import CartoesHeaderComp from '../../CartoesHeader/components/CartoesHeaderComp';
import CartoesResumoComp from '../../CartoesResumo/components/CartoesResumoComp';
import CartoesListComp from '../../CartoesList/components/CartoesListComp';
import CartoesModalComp from '../../CartoesModal/components/CartoesModalComp';
import CartoesDetalheComp from '../../CartoesDetalhe/components/CartoesDetalheComp';
import CartoesConfirmComp from '../../CartoesConfirm/components/CartoesConfirmComp';
import CartoesInfoComp from '../../CartoesInfo/components/CartoesInfoComp';
import { useCartoesMain } from '../utils/CartoesMainUtils';
import {
  StyledCartoesLayout,
  StyledCartoesMainContent,
  StyledHamburgerButton,
  StyledOverlay,
  StyledCartoesContainer,
  StyledLoading,
} from '../styles/CartoesMainStyles';

export default function CartoesMainComp() {
  const { state, actions, helpers } = useCartoesMain();

  if (state.isLoading) {
    return (
      <StyledCartoesLayout>
        <StyledCartoesMainContent>
          <StyledCartoesContainer>
            <StyledLoading>Carregando cartões de crédito...</StyledLoading>
          </StyledCartoesContainer>
        </StyledCartoesMainContent>
      </StyledCartoesLayout>
    );
  }

  if (!state.data) return null;

  return (
    <StyledCartoesLayout>
      <StyledHamburgerButton onClick={actions.toggleSidebar}>
        ☰
      </StyledHamburgerButton>
      <StyledOverlay $visible={state.sidebarOpen} onClick={actions.closeSidebar} />
      <SidebarComp $isOpen={state.sidebarOpen} />
      <StyledCartoesMainContent>
        <HeaderComp />
        <StyledCartoesContainer>
          <CartoesHeaderComp
            onAbrirInfo={actions.abrirInfo}
            onAbrirModalNovo={actions.abrirModalNovo}
          />

          <CartoesResumoComp
            resumo={state.data.resumo}
            formatarValor={helpers.formatarValor}
          />

          <CartoesListComp
            cartoesFiltrados={state.cartoesFiltrados}
            filtros={state.filtros}
            data={state.data}
            formatarValor={helpers.formatarValor}
            getBandeiraLabel={helpers.getBandeiraLabel}
            getBandeiraCor={helpers.getBandeiraCor}
            getStatusLabel={helpers.getStatusLabel}
            getStatusCor={helpers.getStatusCor}
            formatarLimite={helpers.formatarLimite}
            onAtualizarFiltro={actions.atualizarFiltro}
            onLimparFiltros={actions.limparFiltros}
            onAbrirDetalhe={actions.abrirDetalhe}
            onAbrirModalEditar={actions.abrirModalEditar}
            onConfirmarExclusao={actions.confirmarExclusao}
          />

          <CartoesModalComp
            modalAberto={state.modalAberto}
            editandoId={state.editandoId}
            formData={state.formData}
            data={state.data}
            onFecharModal={actions.fecharModal}
            onAtualizarForm={actions.atualizarForm}
            onSalvarCartao={actions.salvarCartao}
          />

          <CartoesDetalheComp
            detalheCartao={state.detalheCartao}
            formatarValor={helpers.formatarValor}
            getBandeiraLabel={helpers.getBandeiraLabel}
            getBandeiraCor={helpers.getBandeiraCor}
            getStatusLabel={helpers.getStatusLabel}
            getStatusCor={helpers.getStatusCor}
            formatarLimite={helpers.formatarLimite}
            onFecharDetalhe={actions.fecharDetalhe}
            onEditar={actions.handleEditarFromDetalhe}
          />

          <CartoesConfirmComp
            exclusaoPendente={state.exclusaoPendente}
            formatarValor={helpers.formatarValor}
            onCancelarExclusao={actions.cancelarExclusao}
            onConfirmarEExcluir={actions.confirmarEExcluir}
          />

          <CartoesInfoComp
            modalInfoAberto={state.modalInfoAberto}
            onFecharInfo={actions.fecharInfo}
          />
        </StyledCartoesContainer>
      </StyledCartoesMainContent>
    </StyledCartoesLayout>
  );
}