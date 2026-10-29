'use client';

import SidebarComp from '@/shared/sidebar/components/SidebarComp';
import HeaderComp from '@/shared/header/components/HeaderComp';
import CaridadeHeaderComp from '../../CaridadeHeader/components/CaridadeHeaderComp';
import CaridadeResumoComp from '../../CaridadeResumo/components/CaridadeResumoComp';
import CaridadeListComp from '../../CaridadeList/components/CaridadeListComp';
import CaridadeModalComp from '../../CaridadeModal/components/CaridadeModalComp';
import CaridadeDetalheComp from '../../CaridadeDetalhe/components/CaridadeDetalheComp';
import CaridadeConfirmComp from '../../CaridadeConfirm/components/CaridadeConfirmComp';
import CaridadeInfoComp from '../../CaridadeInfo/components/CaridadeInfoComp';
import { useCaridadeMain } from '../utils/CaridadeMainUtils';
import {
  StyledCaridadeLayout,
  StyledCaridadeMainContent,
  StyledHamburgerButton,
  StyledOverlay,
  StyledCaridadeContainer,
  StyledLoading,
} from '../styles/CaridadeMainStyles';

export default function CaridadeMainComp() {
  const { state, actions, helpers } = useCaridadeMain();

  if (state.isLoading) {
    return (
      <StyledCaridadeLayout>
        <StyledCaridadeMainContent>
          <StyledCaridadeContainer>
            <StyledLoading>Carregando doações...</StyledLoading>
          </StyledCaridadeContainer>
        </StyledCaridadeMainContent>
      </StyledCaridadeLayout>
    );
  }

  if (!state.data) return null;

  return (
    <StyledCaridadeLayout>
      <StyledHamburgerButton onClick={actions.toggleSidebar}>
        ☰
      </StyledHamburgerButton>
      <StyledOverlay $visible={state.sidebarOpen} onClick={actions.closeSidebar} />
      <SidebarComp $isOpen={state.sidebarOpen} />
      <StyledCaridadeMainContent>
        <HeaderComp />
        <StyledCaridadeContainer>
          <CaridadeHeaderComp
            onAbrirInfo={actions.abrirInfo}
            onAbrirModalNovo={actions.abrirModalNovo}
          />

          <CaridadeResumoComp
            resumo={state.data.resumo}
            formatarValor={helpers.formatarValor}
          />

          <CaridadeListComp
            caridadesFiltradas={state.caridadesFiltradas} filtros={state.filtros} formatarValor={helpers.formatarValor} formatarData={helpers.formatarData} getStatusLabel={helpers.getStatusLabel} getStatusCor={helpers.getStatusCor} onAtualizarFiltro={actions.atualizarFiltro} onLimparFiltros={actions.limparFiltros} onAbrirDetalhe={actions.abrirDetalhe} onAbrirModalEditar={actions.abrirModalEditar} onConfirmarExclusao={actions.confirmarExclusao}
          />

          <CaridadeModalComp
            modalAberto={state.modalAberto}
            editandoId={state.editandoId}
            formData={state.formData}
            onFecharModal={actions.fecharModal}
            onAtualizarForm={actions.atualizarForm}
            onSalvarCaridade={actions.salvarCaridade}
          />

          <CaridadeDetalheComp
            detalheCaridade={state.detalheCaridade} formatarValor={helpers.formatarValor} formatarData={helpers.formatarData} getStatusLabel={helpers.getStatusLabel} getStatusCor={helpers.getStatusCor} onFecharDetalhe={actions.fecharDetalhe} onEditar={actions.handleEditarFromDetalhe}
          />

          <CaridadeConfirmComp
            exclusaoPendente={state.exclusaoPendente}
            formatarValor={helpers.formatarValor}
            onCancelarExclusao={actions.cancelarExclusao}
            onConfirmarEExcluir={actions.confirmarEExcluir}
          />

          <CaridadeInfoComp
            modalInfoAberto={state.modalInfoAberto}
            onFecharInfo={actions.fecharInfo}
          />
        </StyledCaridadeContainer>
      </StyledCaridadeMainContent>
    </StyledCaridadeLayout>
  );
}
