'use client';

import SidebarComp from '@/shared/sidebar/components/SidebarComp';
import HeaderComp from '@/shared/header/components/HeaderComp';
import EmprestimosHeaderComp from '../../EmprestimosHeader/components/EmprestimosHeaderComp';
import EmprestimosResumoComp from '../../EmprestimosResumo/components/EmprestimosResumoComp';
import EmprestimosListComp from '../../EmprestimosList/components/EmprestimosListComp';
import EmprestimosModalComp from '../../EmprestimosModal/components/EmprestimosModalComp';
import EmprestimosDetalheComp from '../../EmprestimosDetalhe/components/EmprestimosDetalheComp';
import EmprestimosConfirmComp from '../../EmprestimosConfirm/components/EmprestimosConfirmComp';
import EmprestimosInfoComp from '../../EmprestimosInfo/components/EmprestimosInfoComp';
import { useEmprestimosMain } from '../utils/EmprestimosMainUtils';
import {
  StyledEmprestimosLayout,
  StyledEmprestimosMainContent,
  StyledHamburgerButton,
  StyledOverlay,
  StyledEmprestimosContainer,
  StyledLoading,
} from '../styles/EmprestimosMainStyles';

export default function EmprestimosMainComp() {
  const { state, actions, helpers } = useEmprestimosMain();

  if (state.isLoading) {
    return (
      <StyledEmprestimosLayout>
        <StyledEmprestimosMainContent>
          <StyledEmprestimosContainer>
            <StyledLoading>Carregando empréstimos...</StyledLoading>
          </StyledEmprestimosContainer>
        </StyledEmprestimosMainContent>
      </StyledEmprestimosLayout>
    );
  }

  if (!state.data) return null;

  return (
    <StyledEmprestimosLayout>
      <StyledHamburgerButton onClick={actions.toggleSidebar}>
        ☰
      </StyledHamburgerButton>
      <StyledOverlay $visible={state.sidebarOpen} onClick={actions.closeSidebar} />
      <SidebarComp $isOpen={state.sidebarOpen} />
      <StyledEmprestimosMainContent>
        <HeaderComp />
        <StyledEmprestimosContainer>
          <EmprestimosHeaderComp
            onAbrirInfo={actions.abrirInfo}
            onAbrirModalNovo={actions.abrirModalNovo}
          />

          <EmprestimosResumoComp
            resumo={state.data.resumo}
            formatarValor={helpers.formatarValor}
          />

          <EmprestimosListComp
            emprestimosFiltradas={state.emprestimosFiltradas} filtros={state.filtros} formatarValor={helpers.formatarValor} formatarData={helpers.formatarData} getStatusLabel={helpers.getStatusLabel} getStatusCor={helpers.getStatusCor} calcularProgresso={helpers.calcularProgresso} onAtualizarFiltro={actions.atualizarFiltro} onLimparFiltros={actions.limparFiltros} onAbrirDetalhe={actions.abrirDetalhe} onAbrirModalEditar={actions.abrirModalEditar} onConfirmarExclusao={actions.confirmarExclusao}
          />

          <EmprestimosModalComp
            modalAberto={state.modalAberto}
            editandoId={state.editandoId}
            formData={state.formData}
            onFecharModal={actions.fecharModal}
            onAtualizarForm={actions.atualizarForm}
            onSalvarEmprestimo={actions.salvarEmprestimo}
          />

          <EmprestimosDetalheComp
            detalheEmprestimo={state.detalheEmprestimo} formatarValor={helpers.formatarValor} formatarData={helpers.formatarData} getStatusLabel={helpers.getStatusLabel} getStatusCor={helpers.getStatusCor} calcularProgresso={helpers.calcularProgresso} onFecharDetalhe={actions.fecharDetalhe} onEditar={actions.handleEditarFromDetalhe}
          />

          <EmprestimosConfirmComp
            exclusaoPendente={state.exclusaoPendente}
            formatarValor={helpers.formatarValor}
            onCancelarExclusao={actions.cancelarExclusao}
            onConfirmarEExcluir={actions.confirmarEExcluir}
          />

          <EmprestimosInfoComp
            modalInfoAberto={state.modalInfoAberto}
            onFecharInfo={actions.fecharInfo}
          />
        </StyledEmprestimosContainer>
      </StyledEmprestimosMainContent>
    </StyledEmprestimosLayout>
  );
}
