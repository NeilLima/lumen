'use client';
import SidebarComp from '@/shared/sidebar/components/SidebarComp';
import HeaderComp from '@/shared/header/components/HeaderComp';
import { FeedbackModalComp } from '@/shared/feedback';
import ContasHeaderComp from '../../ContasHeader/components/ContasHeaderComp';
import ContasResumoComp from '../../ContasResumo/components/ContasResumoComp';
import ContasListComp from '../../ContasList/components/ContasListComp';
import ContasModalComp from '../../ContasModal/components/ContasModalComp';
import ContasDetalheComp from '../../ContasDetalhe/components/ContasDetalheComp';
import ContasConfirmComp from '../../ContasConfirm/components/ContasConfirmComp';
import ContasInfoComp from '../../ContasInfo/components/ContasInfoComp';
import { useContasMain } from '../utils/ContasMainUtils';
import { StyledLayout, StyledContent, StyledHamburger, StyledOverlay, StyledContainer, StyledLoading } from '../styles/ContasMainStyles';
export default function ContasMainComp() {
  const { state, actions, helpers } = useContasMain();
  return <StyledLayout>
    <StyledHamburger onClick={actions.toggleSidebar} data-testid="contas-hamburger">☰</StyledHamburger>
    <StyledOverlay $visible={state.sidebarOpen} onClick={actions.closeSidebar} />
    <SidebarComp $isOpen={state.sidebarOpen} />
    <StyledContent>
      <HeaderComp />
      <StyledContainer>
        {state.isLoading && <StyledLoading>Carregando contas...</StyledLoading>}
        {!state.isLoading && state.data && <>
          <ContasHeaderComp onAbrirInfo={actions.abrirInfo} onAbrirModalNovo={actions.abrirModalNovo} />
          <ContasResumoComp resumo={state.data.resumo} formatarValor={helpers.formatarValor} getTipoLabel={helpers.getTipoLabel} />
          <ContasListComp contasFiltradas={state.contasFiltradas} filtros={state.filtros} data={state.data} formatarValor={helpers.formatarValor} getTipoLabel={helpers.getTipoLabel} onAtualizarFiltro={actions.atualizarFiltro} onLimparFiltros={actions.limparFiltros} onAbrirDetalhe={actions.abrirDetalhe} onAbrirModalEditar={actions.abrirModalEditar} onConfirmarExclusao={actions.confirmarExclusao} />
          <ContasModalComp modalAberto={state.modalAberto} editandoId={state.editandoId} formData={state.formData} data={state.data} onFecharModal={actions.fecharModal} onAtualizarForm={actions.atualizarForm} onSalvarConta={actions.salvarConta} />
          <ContasDetalheComp detalheConta={state.detalheConta} formatarValor={helpers.formatarValor} getTipoLabel={helpers.getTipoLabel} onFecharDetalhe={actions.fecharDetalhe} onEditar={actions.handleEditarFromDetalhe} />
          <ContasConfirmComp exclusaoPendente={state.exclusaoPendente} formatarValor={helpers.formatarValor} onCancelarExclusao={actions.cancelarExclusao} onConfirmarEExcluir={actions.confirmarEExcluir} />
          <ContasInfoComp modalInfoAberto={state.modalInfoAberto} onFecharInfo={actions.fecharInfo} />
        </>}
        <FeedbackModalComp feedback={state.feedback} onFechar={actions.fecharFeedback} />
      </StyledContainer>
    </StyledContent>
  </StyledLayout>;
}
