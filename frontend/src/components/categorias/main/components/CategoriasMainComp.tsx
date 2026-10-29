'use client';

import SidebarComp from '@/shared/sidebar/components/SidebarComp';
import HeaderComp from '@/shared/header/components/HeaderComp';
import CategoriasHeaderComp from '../../CategoriasHeader/components/CategoriasHeaderComp';
import CategoriasResumoComp from '../../CategoriasResumo/components/CategoriasResumoComp';
import CategoriasListComp from '../../CategoriasList/components/CategoriasListComp';
import CategoriasModalComp from '../../CategoriasModal/components/CategoriasModalComp';
import CategoriasDetalheComp from '../../CategoriasDetalhe/components/CategoriasDetalheComp';
import CategoriasConfirmComp from '../../CategoriasConfirm/components/CategoriasConfirmComp';
import CategoriasInfoComp from '../../CategoriasInfo/components/CategoriasInfoComp';
import { useCategoriasMain } from '../utils/CategoriasMainUtils';
import {
  StyledCategoriasLayout,
  StyledCategoriasMainContent,
  StyledHamburgerButton,
  StyledOverlay,
  StyledCategoriasContainer,
  StyledLoading,
} from '../styles/CategoriasMainStyles';

export default function CategoriasMainComp() {
  const { state, actions, helpers } = useCategoriasMain();

  if (state.isLoading) {
    return (
      <StyledCategoriasLayout>
        <StyledCategoriasMainContent>
          <StyledCategoriasContainer>
            <StyledLoading>Carregando categorias...</StyledLoading>
          </StyledCategoriasContainer>
        </StyledCategoriasMainContent>
      </StyledCategoriasLayout>
    );
  }

  if (!state.data) return null;

  return (
    <StyledCategoriasLayout>
      <StyledHamburgerButton onClick={actions.toggleSidebar}>
        ☰
      </StyledHamburgerButton>
      <StyledOverlay $visible={state.sidebarOpen} onClick={actions.closeSidebar} />
      <SidebarComp $isOpen={state.sidebarOpen} />
      <StyledCategoriasMainContent>
        <HeaderComp />
        <StyledCategoriasContainer>
          <CategoriasHeaderComp
            onAbrirInfo={actions.abrirInfo}
            onAbrirModalNovo={actions.abrirModalNovo}
          />

          <CategoriasResumoComp
            resumo={state.data.resumo}
            formatarValor={helpers.formatarValor}
          />

          <CategoriasListComp
            categoriasFiltradas={state.categoriasFiltradas} filtros={state.filtros} formatarValor={helpers.formatarValor} formatarData={helpers.formatarData} getStatusLabel={helpers.getStatusLabel} getStatusCor={helpers.getStatusCor} onAtualizarFiltro={actions.atualizarFiltro} onLimparFiltros={actions.limparFiltros} onAbrirDetalhe={actions.abrirDetalhe} onAbrirModalEditar={actions.abrirModalEditar} onConfirmarExclusao={actions.confirmarExclusao}
          />

          <CategoriasModalComp
            modalAberto={state.modalAberto}
            editandoId={state.editandoId}
            formData={state.formData}
            onFecharModal={actions.fecharModal}
            onAtualizarForm={actions.atualizarForm}
            onSalvarCategoria={actions.salvarCategoria}
          />

          <CategoriasDetalheComp
            detalheCategoria={state.detalheCategoria} formatarValor={helpers.formatarValor} formatarData={helpers.formatarData} getStatusLabel={helpers.getStatusLabel} getStatusCor={helpers.getStatusCor} onFecharDetalhe={actions.fecharDetalhe} onEditar={actions.handleEditarFromDetalhe}
          />

          <CategoriasConfirmComp
            exclusaoPendente={state.exclusaoPendente}
            formatarValor={helpers.formatarValor}
            onCancelarExclusao={actions.cancelarExclusao}
            onConfirmarEExcluir={actions.confirmarEExcluir}
          />

          <CategoriasInfoComp
            modalInfoAberto={state.modalInfoAberto}
            onFecharInfo={actions.fecharInfo}
          />
        </StyledCategoriasContainer>
      </StyledCategoriasMainContent>
    </StyledCategoriasLayout>
  );
}
